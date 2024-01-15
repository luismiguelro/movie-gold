import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, [getMovieData, movieId]);

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Reviews</h3>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={4}>
                    {/* Apply styles for the movie poster */}
                    <img src={movie?.poster} alt="" style={{
                        width: '100%',
                        borderRadius: '10px',
                        border: '1px solid #ffd700', // Add border color and width
                    }} />
                </Col>
                <Col md={8}>
                    <Row>
                        <Col>
                            <ReviewForm labelText="Write a Review?" />
                        </Col>
                    </Row>
                    <hr style={{ borderColor: '#ddd' }} />
                    {reviews && reviews.length > 1 && (
                        reviews.map((r, index) => (
                            <div key={index}>
                                <Row>
                                    <Col>
                                        {/* Apply styles for the review body */}
                                        <p style={{ marginBottom: '0', fontSize: '16px' }}>{r.body}</p>
                                    </Col>
                                </Row>
                                <hr style={{ borderColor: '#ddd' }} />
                            </div>
                        ))
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr style={{ borderColor: '#ddd' }} />
                </Col>
            </Row>
        </Container>
    );
}

export default Reviews;
