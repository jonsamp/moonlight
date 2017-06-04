import React from 'react';
import moment from 'moment';
import { Card, Button } from 'belle';
import { Row, Media, Col, Glyphicon, Modal } from 'react-bootstrap';
import Placeholder from './Placeholder';
import { respectLineBreaks } from '../helpers/utils.js';

const ListingModal = (props) => {
  const { listing, show, onHide } = props;
  const {
    avatarUrl,
    avatar_url,
    aboutYou,
    displayName,
    details,
    jobLocation,
    startDate,
    endDate,
    preferEmail,
    preferPhone,
    phoneNumber,
    email,
    demographics,
    practiceType,
    specialty,
    website,
  } = listing;
  const duration = moment.duration(moment(endDate).diff(moment(startDate))).humanize();


  return (
    <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby="contained-modal-title-lg" className="listing-modal">
      <Modal.Header closeButton />
      <Modal.Body>
        <Row>
          <Col xs={12} className="user-info">
            <img src={avatarUrl || avatar_url} className="avatar" />
            <Media.Heading className="display-name">{displayName}</Media.Heading>
            <p className="summary">{`Requesting a doctor for ${duration} in ${jobLocation}.`}</p>
          </Col>
        </Row>
        <Row className="detail-group greyed">
          <Col xs={12}>
            <h5 className="title">Details</h5>
            <p>{respectLineBreaks(details)}</p>
          </Col>
        </Row>
        <Row className="detail-group greyed">
          <Col xs={6}>
            <h5 className="title">
              <Glyphicon glyph="time" /> Dates
            </h5>
            <p>{moment(startDate).format('MM/DD/YY')} to {moment(endDate).format('MM/DD/YY')}</p>
          </Col>
          <Col xs={6}>
            <h5 className="title">
              <Glyphicon glyph="map-marker" /> {'Location'}
            </h5>
            <p>{jobLocation}</p>
          </Col>
        </Row>
        <Row className="detail-group">
          <Col xs="6">
            <h5 className="title">
              Preferred Contact
            </h5>
            {preferPhone ?
              <p>Phone: {phoneNumber || <Placeholder />}</p> :
              null
            }
            {preferEmail ?
              <p>Email: {email || <Placeholder />}</p> :
              null
            }
          </Col>
          <Col xs="6">
            <h5 className="title">
              Specialty
            </h5>
            <p>
              {specialty || <Placeholder />}
            </p>
          </Col>
        </Row>
        <Row className="detail-group">
          <Col xs="6">
            <h5 className="title">
              Demographics
            </h5>
            {demographics || <Placeholder />}
          </Col>
          <Col xs="6">
            <h5 className="title">
              Practice Type
            </h5>
            {practiceType || <Placeholder />}
          </Col>
        </Row>
        <Row className="detail-group">
          <Col xs="6">
            <h5 className="title">
              About {displayName}
            </h5>
            {respectLineBreaks(aboutYou) || <Placeholder />}
          </Col>
          <Col xs="6">
            <h5 className="title">
              Website
            </h5>
            {website || <Placeholder />}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ListingModal;
