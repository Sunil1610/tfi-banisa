'use client';

import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import KathaVintaava from '@/components/KathaVintaava';
import Saregamapa from '@/components/Saregamapa';
import Header from '@/components/Header';
import { Film, MusicNote, Trophy, Star } from 'react-bootstrap-icons';

export default function Home() {
  const [activeKey, setActiveKey] = useState('katha-vintaava');

  return (
    <>
      <Header />
      <Container fluid className="px-3 px-md-4">
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            {/* Hero Section */}
            <div className="text-center py-5 slide-in">
              <h2 className="display-6 fw-bold mb-3" style={{
                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Test Your Telugu Cinema Knowledge
              </h2>
              <p className="lead text-muted mb-4">
                Challenge yourself with movie clues and song clips from Tollywood's finest
              </p>
              
              {/* Game Stats Cards */}
              <Row className="g-3 mb-5">
                <Col md={6}>
                  <Card className="h-100 border-0 glass">
                    <Card.Body className="text-center p-4">
                      <Film size={40} className="text-primary mb-3" />
                      <h5 className="fw-bold mb-2">Movie Quiz</h5>
                      <p className="text-muted small mb-0">Guess Telugu movies from clues</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="h-100 border-0 glass">
                    <Card.Body className="text-center p-4">
                      <MusicNote size={40} className="text-secondary mb-3" />
                      <h5 className="fw-bold mb-2">Song Quiz</h5>
                      <p className="text-muted small mb-0">Identify songs from audio clips</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>

            {/* Game Tabs */}
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-0">
                <Tab.Container 
                  id="main-tabs" 
                  activeKey={activeKey}
                  onSelect={(k) => setActiveKey(k || 'katha-vintaava')}
                >
                  <Nav variant="tabs" className="justify-content-center border-0 p-3">
                    <Nav.Item>
                      <Nav.Link 
                        eventKey="katha-vintaava"
                        className="d-flex align-items-center px-4 py-3"
                      >
                        <Film className="me-2" size={20} />
                        <span className="fw-semibold">Katha Vintaava</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link 
                        eventKey="saregamapa"
                        className="d-flex align-items-center px-4 py-3"
                      >
                        <MusicNote className="me-2" size={20} />
                        <span className="fw-semibold">Saregamapa</span>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  
                  <Tab.Content className="p-4">
                    <Tab.Pane eventKey="katha-vintaava" className="fade-in">
                      <KathaVintaava />
                    </Tab.Pane>
                    <Tab.Pane eventKey="saregamapa" className="fade-in">
                      <Saregamapa />
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>

            {/* Footer */}
            <div className="text-center py-5">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <Trophy className="text-warning me-2" size={24} />
                <span className="fw-semibold">Challenge Your Friends!</span>
              </div>
              <p className="text-muted small">
                Share your scores and compete with fellow Telugu cinema enthusiasts
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
