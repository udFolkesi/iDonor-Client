import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Hello, user!</h1>
        <h3>Welcome to our new generation-service of comfortable blood donation</h3>
        <p>To get full access to our app you need to register your account</p>
        <div className='text-center'>
          <img src='https://www.centurypa.com/images/blog/Blood%20donation.jpg' style={{width: '30%'}} class="img-fluid"></img>
        </div>
        <Container className="mt-5">
      <Row className="mb-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>User-Centric Design</Card.Title>
              <Card.Text>
                Our ReactJS-based interface ensures a seamless and intuitive experience. Every click and interaction is designed with the user in mind, offering an unparalleled journey through the donation process.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Responsive and Adaptive</Card.Title>
              <Card.Text>
                Bootstrap's responsiveness ensures that our system adapts flawlessly to various devices, whether you're accessing it on a desktop, tablet, or mobile phone. Blood donation is not limited to a location, and neither should our system be.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Add more Card components for other features */}

      <Row className="mt-5">
        <Col>
          <h2 className="text-center mb-4">Why Blood Donation is Crucial</h2>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Saving Lives</Card.Title>
              <Card.Text>
                Blood donation directly contributes to saving lives. Every drop donated can be the difference between life and death for someone in need.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Community Strength</Card.Title>
              <Card.Text>
                Blood donation fosters a sense of community strength. It unites individuals under a common cause, emphasizing the power of collective goodwill.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Add more Card components for other benefits */}

      <Row className="mt-5">
        <Col>
          <h2 className="text-center mb-4">Join Us in Making a Difference</h2>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <Card>
            <Card.Body>
              <Card.Text>
                As developers, our mission goes beyond lines of code. We invite you to embark on this journey with us, contributing not just blood but also a piece of your humanity. Together, let's make the act of donating blood not just a necessity but a shared expression of compassion and community strength.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <img
            src="https://via.placeholder.com/1200x400"
            alt="Blood Donation Campaign"
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
      </div>
    );
  }
}
