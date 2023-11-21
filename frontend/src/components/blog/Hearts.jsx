import { Fragment } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';



const hearts = ({ hearts }) => {
    const getHearts = () => {
        if (
            hearts &&
            hearts !== null &&
            hearts !== undefined
        ) {
            return (
                <div className='flex flex-row'>
                    {
                        hearts >= 1 || hearts >= 1.0 ? (
                            <FaHeart
                            className='heart text-yellow-300 border-stone-950'
                               
                            />
                        ) : (
                            hearts === 0.5 ? (
                                <FaHeart
                                className='heart text-yellow-300 border-stone-950'
                               
                            />
                            ) : (
                                <FaRegHeart 
                                className='heart text-yellow-300 border-stone-950'
                                /> // Cambia FontAwesomeIcon a FaRegHeart
                            )
                        )
                    }

                    {
                        hearts >= 2 || hearts >= 2.0 ? (
                            <FaHeart
                            className='heart text-yellow-300 border-stone-950'
                           
                        />
                        ) : (
                            hearts=== 1.5 ? (
                                <FaHeart
                                className='heart text-yellow-300 border-stone-950'
                               
                            />
                            ) : (
                                <FaRegHeart 
                                className='heart text-yellow-300 border-stone-950'
                                /> // Cambia FontAwesomeIcon a FaRegHeart
                            )
                        )
                    }

                    {
                        hearts >= 3 || hearts >= 3.0 ? (
                            <FaHeart
                            className='heart text-yellow-300 border-stone-950'
                               
                            />
                        ) : (
                            hearts === 2.5 ? (
                                <FaHeart
                                className='heart text-yellow-300 border-stone-950'
                               
                            />
                            ) : (
                                <FaRegHeart 
                                className='heart text-yellow-300 border-stone-950'
                                /> // Cambia FontAwesomeIcon a FaRegHeart
                            )
                        )
                    }

                    {
                        hearts >= 4 || hearts >= 4.0 ? (
                            <FaHeart
                            className='heart text-yellow-300 border-stone-950'
                           
                        />
                        ) : (
                            hearts === 3.5 ? (
                                <FaHeart
                                className='hear text-yellow-300 border-stone-950'
                               
                            />
                            ) : (
                                <FaRegHeart 
                                className='heart  text-yellow-300 border-stone-950'
                                /> // Cambia FontAwesomeIcon a FaRegHeart
                            )
                        )
                    }

                    {
                        hearts >= 5 || hearts>= 5.0 ? (
                            <FaHeart
                            className='heart text-yellow-300 border-stone-950'
                               
                            />
                        ) : (
                            hearts === 4.5 ? (
                                <FaHeart
                                className='heart text-yellow-300 border-stone-950'
                               
                            />
                            ) : (
                                <FaRegHeart 
                                className='heart text-yellow-300 border-stone-950'
                                 /> // Cambia FontAwesomeIcon a FaRegHeart
                            )
                        )
                    }
                </div>
            )
        }
    }

    return (
        <Fragment>
            {getHearts()}
        </Fragment>
    )
}

export default hearts