import React from 'react';
import moment from 'moment';
import { Card, Button } from 'belle';
import { Row, Media, Col, Glyphicon, Modal } from 'react-bootstrap';
import { deletePost, fulfillRequest, getUser } from '../helpers/userActions';

const ListingModal = (props) => {
  const { listing, show, onHide } = props;
  const { requester, details, jobLocation, startDate, endDate, fulfilled } = listing;
  const duration = moment.duration(moment(endDate).diff(moment(startDate))).humanize();
  console.log('listing:', listing)

  return (
    <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby="contained-modal-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">{listing.requester}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Wrapped Text</h4>
          <Row className="request-body">
            <Col md={8}>
              <Media.Heading>{requester}</Media.Heading>
              <p>{`Requesting a doctor for ${duration} in ${jobLocation}.`}</p>
              <h5>Details</h5>
              <p>{details}</p>
            </Col>
            <Col md={4}>
              <h5><Glyphicon glyph="time" /> Dates</h5>
              <p>{moment(startDate).format('MM/DD/YY')} to {moment(endDate).format('MM/DD/YY')}</p>
              <h5><Glyphicon glyph="map-marker" /> {'Location'}</h5>
              <p>{jobLocation}</p>
            </Col>

          </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
};

export default ListingModal;
