import React from 'react'
import Carousel from 'react-material-ui-carousel'
import CarouselItem from '../CarouselItem/CarouselItem'

export default function Home({ items }) {
    return (
        <React.Fragment>
            <Carousel interval={7000}>
                {
                    items.map(item => <CarouselItem key={item._id} item={item} />)
                }
            </Carousel>
        </React.Fragment>
    )
}
