import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide, faArrowUpShortWide } from '@fortawesome/free-solid-svg-icons';

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
        const rev = revText.current;

        try {
            const response = await axios.post(urlBase, { reviewBody: rev.value, imdbId: movieId });
            const updatedReviews = [...reviews, { body: rev.value }];
            setReviews(updatedReviews);
        } catch (err) {
            console.error(err);
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
                            <FontAwesomeIcon icon={icon} onClick={toggleSortOrder} style={{ cursor: 'pointer' }} /> Order
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        {sortedReviews.length === 0 && (
                            <Col>
                                <p>No review available. Be the first to write one!</p>
                            </Col>
                        )}
                        {sortedReviews.map((r) => {
                            const reviewDate = new Date(r.id.date);
                            return (
                                <React.Fragment key={r.id}>
                                    <Row>
                                        <Col>
                                            <p style={{ marginBottom: '0', fontSize: '16px' }}>{r.body}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <small style={{ color: '#888', fontSize: '12px' }}>
                                                {reviewDate.toLocaleString()}
                                            </small>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr style={{ borderColor: '#ddd' }} />
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            );
                        })}
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