import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register';

import { Container, CssBaseline } from '@material-ui/core';
import {Switch, Route,useHistory, useLocation } from "react-router-dom";
import userService from './services/userService';
import BookForm from './components/BookForm/BookForm';
import bookService from './services/bookService';
import BookView from './components/BookView/BookView';
import Readlist from './components/Readlist/Readlist';
import TopBooks from './components/TopBooks/TopBooks';
import UserList from './components/UserList/UserList';

const sections = [
  { title: 'Top Rated', url: '/top', adminPage: false },
  { title: 'Read List', url: '/readlist', adminPage: false },
  { title: 'Add Book', url: '/addbook', adminPage: false },
  { title: 'Users', url: '/users', adminPage: true }
];

function App() {

  const [loggedUser, setLoggedUser] = useState(undefined);
  const [redirectUri, setRedirectUri] = useState(undefined);
  const [books, setBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [searchedBook, setSearchedBook] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    bookService.getAllBooks()
      .then(books => {
        setBooks(books);
        setFeaturedBooks(books.length < 3 ? books : books.slice(Math.max(books.length - 3, 1)));
      });
  }, []);


  return (

    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">


        <Header title="Book database" sections={sections} loggedUser={loggedUser} onLogout={logoutUser} onSearch={handleSearch} isAdmin={isAdmin} />
        <main>
          <Switch>
            <Route path="/" exact>
              <Home items={featuredBooks} />
            </Route>
            <Route path="/login" exact>
              <Login onLogin={loginUser} />
            </Route>
            <Route path="/register" exact>
              <Register onRegister={registerUser} />
            </Route>
            <Route path="/addbook" exact>
              <BookForm onBookSubmit={submitBook} loggedUser={loggedUser} setRedirect={setRedirectUri} />
            </Route>
            <Route path="/books/:name">
              <BookView book={searchedBook} onAddReadlist={addToReadList} loggedUser={loggedUser} updateBook={updateBook} />
            </Route>
            <Route path="/readlist">
              <Readlist books={loggedUser ? loggedUser.readlist : null} redirect={setRedirectUri} removeItem={removeFromReadList}
                moreInformation={moreInformationBook} />
            </Route>
            <Route path="/top">
              <TopBooks books={books} handleContinue={moreInformationBook} />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
          </Switch>

        </main>
      </Container>
    </React.Fragment>
  );


  function registerUser(user) {
    userService.register(user)
      .then(created => {
        history.push('/login');
      })
      .catch(error => {
        console.error(error);
      })
  }

  function loginUser(credentials) {
    userService.login(credentials)
      .then(response => {
        if (response.message) {
          alert('Wrong username or password.');
        }
        setLoggedUser(response.user);
        setIsAdmin(response.user.username === 'admin' ? true : false);
        sessionStorage.setItem('loggedUser', response.token);
        if (redirectUri) {
          history.push(redirectUri);
        } else {
          history.push('/');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  function logoutUser() {
    setLoggedUser(undefined);
    setIsAdmin(false);
    history.push('/');
  }

  function submitBook(book) {
    bookService.addBook(book)
      .then(createdBook => {
        setBooks(old => [...old, createdBook]);
        setFeaturedBooks(books.length < 3 ? books : books.slice(Math.max(books.length - 3, 1)));
        history.push('/');
      })
      .catch(error => {
        console.error(error);
      });
  }

  function handleSearch(searchText) {
    bookService.getBook(searchText)
      .then(book => {
        setSearchedBook(book);
        history.push('/books/' + book.name);
      })
      .catch(err => {
        console.error(err);
      });
  }

  function addToReadList(book) {
    if (!loggedUser) {
      setRedirectUri(location.pathname);
      history.push('/login');
      return;
    }
    if (loggedUser.readlist.filter(b => b._id === book._id).length > 0) {
      alert('You have already this book in your readlist.');
      return;
    }
    loggedUser.readlist.push(book);
    userService.updateUser(loggedUser)
      .then(response => {
        if (response.message) {
          console.error(response.message);
          return;
        }
        setLoggedUser(response);
        alert('Successfuly added to readlist');
      })
      .catch(err => {
        console.error(err);
      });
  }

  function removeFromReadList(book) {
    loggedUser.readlist = loggedUser.readlist.filter(b => b._id !== book._id);
    userService.updateUser(loggedUser)
      .then(response => {
        if (response.message) {
          console.error(response.message);
          return;
        }
        setLoggedUser(response);
      })
      .catch(err => {
        console.error(err);
      });
  }

  function moreInformationBook(book) {
    setSearchedBook(book);
    history.push('/books/' + book.name);
  }

  function updateBook(book) {
    bookService.updateBook(book)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      })
  }

}

export default App;
