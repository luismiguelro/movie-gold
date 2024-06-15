import React from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
const ReviewItem = ({ review }) => {
    const reviewDate = new Date(review.id.date);
    console.log("Hola desde Itemn",review);
    return (
        <>
            <Row>
                <Col>
                    <p style={{ marginBottom: '0', fontSize: '16px' }}>{review.body}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <small style={{ color: '#888', fontSize: '12px' }}>
                        {review.createdBy}
                    </small>
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
        </>
    );
};

export default ReviewItem;
