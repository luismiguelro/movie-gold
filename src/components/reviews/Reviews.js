import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide, faArrowUpShortWide } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import './Reviews.css'
import ReviewItem from './ReviewItem';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const urlBase = 'https://api-movies.fly.dev/api/v1/reviews';
    const revText = useRef();
    const params = useParams();
    const movieId = params.movieId;

    const [sortOrder, setSortOrder] = useState('desc'); // Default sorting order is descending
    const icon = sortOrder === 'desc' ? faArrowUpShortWide : faArrowDownShortWide;
    useEffect(() => {
        getMovieData(movieId);
    }, [movieId]);
    
    const addReview = async (e) => {
        e.preventDefault();
    
        if (revText.current && revText.current.value.trim() !== '') {
            const rev = revText.current;
    
            try {
                const response = await axios.post(urlBase, { reviewBody: rev.value, imdbId: movieId });
                const newReview = { body: rev.value, id: response.data };
                // Actualiza primero las revisiones en el estado
                setReviews((prevReviews) => [...prevReviews, newReview]);
    
                // Luego, vuelve a cargar los datos de la película
                await getMovieData(movieId);
    
                // Limpia el campo de revisión después de agregar la revisión
                rev.value = '';
            } catch (err) {
                console.error("Error adding review:", err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error",
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "",
            });
        }
    };
    




    const toggleSortOrder = () => {
        setSortOrder((prevSortOrder) => (prevSortOrder === 'desc' ? 'asc' : 'desc'));
    };

    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a.id.date) - new Date(b.id.date);
        } else {
            return new Date(b.id.date) - new Date(a.id.date);
        }
    });

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Reviews</h3>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={4}>
                    <img src={movie?.poster} alt="" style={{
                        width: '100%',
                        borderRadius: '10px',
                        border: '1px solid #ffd700', // Add border color and width
                    }} />
                </Col>
                <Col md={8}>
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    <Row className="mt-4">
                        <Col>
                            <Button variant="light" onClick={toggleSortOrder} style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={icon} />
                                {' '} Order
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-4 reviews-container">
                        {sortedReviews.length === 0 ? (
                            <Col>
                                <p>No reviews available. Be the first to write one!</p>
                            </Col>
                        ) : (
                            sortedReviews.map((review) => (
                                <ReviewItem key={review.id.timestamp} review={review} />
                            ))
                        )}
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
}

export default Reviews