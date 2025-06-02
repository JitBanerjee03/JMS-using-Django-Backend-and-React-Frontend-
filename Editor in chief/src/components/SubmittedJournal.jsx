import React, { useContext, useState } from 'react';
import { Table, Alert, Badge, Form, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import { FaInfoCircle, FaEye, FaCheck, FaTimes, FaUserEdit, FaSearch, FaFilter, FaRedo } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { contextProviderDeclare } from '../store/ContextProvider';

const SubmittedJournal = ({ submittedJournal }) => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectAreaFilter, setSubjectAreaFilter] = useState('all');
  const [journalSectionFilter, setJournalSectionFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [selectedAreaEditor, setSelectedAreaEditor] = useState('');
  const { fetchSubmittedJournal } = useContext(contextProviderDeclare);
  
  // Format date to MM-DD format
  const formatDate = (dateString) => {
    if (!dateString) return '~';
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  // Extract unique values for filters
  const statusOptions = ['all', 'submitted', 'under_review', 'revisions_requested', 'accepted', 'rejected'];
  const subjectAreas = [...new Set(submittedJournal?.map(journal => 
    journal.subject_area ? journal.subject_area.toString() : 'General'
  ))];
  const journalSections = [...new Set(submittedJournal?.map(journal => 
    journal.journal_section ? journal.journal_section.toString() : 'General'
  ))];

  // Sample area editors data - replace with your actual data
  const areaEditors = [
    { id: 1, name: 'Dr. Smith (Computer Science)' },
    { id: 2, name: 'Dr. Johnson (Mathematics)' },
    { id: 3, name: 'Dr. Williams (Physics)' },
  ];

  // Filter journals based on search and filters
  const filteredJournals = submittedJournal?.filter(journal => {
    const matchesSearch = 
      journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journal.author_name_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journal.id.toString().includes(searchTerm);
    
    const matchesStatus = 
      statusFilter === 'all' || journal.status === statusFilter;
    
    const matchesSubjectArea = 
      subjectAreaFilter === 'all' || 
      (journal.subject_area && journal.subject_area.toString() === subjectAreaFilter);
    
    const matchesJournalSection = 
      journalSectionFilter === 'all' || 
      (journal.journal_section && journal.journal_section.toString() === journalSectionFilter);
    
    return matchesSearch && matchesStatus && matchesSubjectArea && matchesJournalSection;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setSubjectAreaFilter('all');
    setJournalSectionFilter('all');
  };

  // Count journals by status for summary cards
  const statusCounts = submittedJournal?.reduce((acc, journal) => {
    acc[journal.status] = (acc[journal.status] || 0) + 1;
    return acc;
  }, {});

  // Get status display text
  const getStatusDisplay = (status) => {
    const statusMap = {
      submitted: 'Submitted',
      under_review: 'Under Review',
      revisions_requested: 'Revisions Requested',
      accepted: 'Accepted',
      rejected: 'Rejected'
    };
    return statusMap[status] || status;
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    const badgeMap = {
      submitted: 'info',
      under_review: 'warning',
      revisions_requested: 'primary',
      accepted: 'success',
      rejected: 'danger'
    };
    return badgeMap[status] || 'secondary';
  };

  // Handle accept journal
  const handleAccept = async(journalId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/journal/mark-accepted/${journalId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      alert('Journal Accepted Successfully!');
      fetchSubmittedJournal();
    } catch (err) {
      console.error("Failed to accept journal:", err);
      alert('Failed to accept journal');
    } 
  };

  // Handle reject journal
  const handleReject = async(journalId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/journal/mark-rejected/${journalId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      alert('Journal Rejected Successfully!');
      fetchSubmittedJournal();
    } catch (err) {
      console.error("Failed to reject journal:", err);
      alert('Failed to reject journal');
    } 
  };

  // Handle request revisions
  const handleRequestRevisions = async(journalId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/journal/mark-revisions-required/${journalId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      alert('Revisions Requested Successfully!');
      fetchSubmittedJournal();
    } catch (err) {
      console.error("Failed to request revisions:", err);
      alert('Failed to request revisions');
    }
  };

  // Handle assign area editor
  const handleAssignAreaEditor = (journalId) => {
    setSelectedJournal(journalId);
    setShowAssignModal(true);
  };

  // Submit area editor assignment
  const submitAreaEditorAssignment = () => {
    if (selectedJournal && selectedAreaEditor) {
      console.log(`Assigning area editor ${selectedAreaEditor} to journal ${selectedJournal}`);
      // Add your assignment logic here
      setShowAssignModal(false);
      setSelectedAreaEditor('');
    }
  };

  return (
    <div className="container-fluid">
      {/* Assign Area Editor Modal */}
      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Area Editor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="areaEditorSelect">
            <Form.Label>Select Area Editor</Form.Label>
            <Form.Select
              value={selectedAreaEditor}
              onChange={(e) => setSelectedAreaEditor(e.target.value)}
            >
              <option value="">Select an area editor</option>
              {areaEditors.map(editor => (
                <option key={editor.id} value={editor.id}>
                  {editor.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitAreaEditorAssignment}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row mb-3">
        <div className="col-md-12">
          <Alert variant="info">
            <FaInfoCircle /> Manage submitted journals. You can view details, accept/reject submissions, request revisions, and assign area editors.
          </Alert>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-3">
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Total Submissions</Card.Title>
              <Card.Text className="display-6">
                {submittedJournal?.length || 0}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Subject Areas</Card.Title>
              <Card.Text>
                {subjectAreas.slice(0, 3).join(', ')}
                {subjectAreas.length > 3 && ` +${subjectAreas.length - 3} more`}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Journal Sections</Card.Title>
              <Card.Text>
                {journalSections.slice(0, 3).join(', ')}
                {journalSections.length > 3 && ` +${journalSections.length - 3} more`}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </div>

      {/* Search and Filter Controls */}
      <div className="row mb-3">
        <div className="col-md-12">
          <Form>
            <Row className="align-items-end">
              <Col md={6}>
                <Form.Group controlId="searchTerm">
                  <Form.Label>Search</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type="text"
                      placeholder="Search by ID, title or author..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="outline-secondary">
                      <FaSearch />
                    </Button>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6} className="text-end">
                <Button 
                  variant="outline-primary"
                  onClick={() => setShowFilters(!showFilters)}
                  className="me-2"
                >
                  <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
                <Button 
                  variant="outline-secondary"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </Col>
            </Row>

            {showFilters && (
              <Row className="mt-3">
                <Col md={4}>
                  <Form.Group controlId="statusFilter">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      {statusOptions.map(option => (
                        <option key={option} value={option}>
                          {getStatusDisplay(option)}
                          {statusCounts && option !== 'all' ? ` (${statusCounts[option] || 0})` : ''}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="subjectAreaFilter">
                    <Form.Label>Subject Area</Form.Label>
                    <Form.Select
                      value={subjectAreaFilter}
                      onChange={(e) => setSubjectAreaFilter(e.target.value)}
                    >
                      <option value="all">All Subject Areas</option>
                      {subjectAreas.map(area => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="journalSectionFilter">
                    <Form.Label>Journal Section</Form.Label>
                    <Form.Select
                      value={journalSectionFilter}
                      onChange={(e) => setJournalSectionFilter(e.target.value)}
                    >
                      <option value="all">All Journal Sections</option>
                      {journalSections.map(section => (
                        <option key={section} value={section}>
                          {section}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}
          </Form>
        </div>
      </div>

      {/* Journals Table */}
      <div className="row">
        <div className="col-md-12">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>MM-DD Submitted</th>
                <th>Section</th>
                <th>Authors</th>
                <th>Title</th>
                <th>Subject Area</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJournals && filteredJournals.length > 0 ? (
                filteredJournals.map((journal) => (
                  <tr key={journal.id}>
                    <td>{journal.id}</td>
                    <td>{formatDate(journal.submission_date)}</td>
                    <td>
                      <Badge bg="secondary" className="text-wrap">
                        {journal.journal_section || 'General'}
                      </Badge>
                    </td>
                    <td>{journal.author_name_text}</td>
                    <td>{journal.title}</td>
                    <td>
                      <Badge bg="info" className="text-wrap">
                        {journal.subject_area || 'General'}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={getStatusBadge(journal.status)}>
                        {getStatusDisplay(journal.status)}
                      </Badge>
                    </td>
                    <td>
                      <Link 
                        to={`/view-journal/${journal.id}`} 
                        className="btn btn-sm btn-primary me-1"
                        title="View Details"
                      >
                        <FaEye />
                      </Link>
                      
                      <Button
                        variant="success"
                        size="sm"
                        title="Accept Submission"
                        onClick={() => handleAccept(journal.id)}
                        className="me-1"
                      >
                        <FaCheck />
                      </Button>
                      
                      <Button
                        variant="danger"
                        size="sm"
                        title="Reject Submission"
                        onClick={() => handleReject(journal.id)}
                        className="me-1"
                      >
                        <FaTimes />
                      </Button>
                      
                      <Button
                        variant="warning"
                        size="sm"
                        title="Request Revisions"
                        onClick={() => handleRequestRevisions(journal.id)}
                        className="me-1"
                      >
                        <FaRedo />
                      </Button>
                      
                      <Button
                        variant="info"
                        size="sm"
                        title="Assign Area Editor"
                        onClick={() => handleAssignAreaEditor(journal.id)}
                      >
                        <FaUserEdit />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    {submittedJournal?.length === 0 
                      ? 'No journals have been submitted yet.' 
                      : 'No submissions match your search criteria.'}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SubmittedJournal;