import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Image,
} from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchBookList, deleteBook } from "../redux/actions";

function Dashboard(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  //state
  const [show, setShow] = useState(false);
  const [id, setId] = useState();

  //selectors
  const { bookList } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchBookList());
  }, []);

  const handleClose = () => {
    setShow(false);
    setId();
  };
  const handleShow = (row) => {
    setShow(true);
    setId(row.id);
  };
  const handleDelete = () => {
    dispatch(deleteBook(id)).then(() => {
      setShow(false);
      setId();
    });
  };

  const cellButton = (cell, row, enumObject, rowIndex) => {
    return (
      <>
        <Button onClick={() => history.push("/book", { data: row })}>
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleShow(row);
          }}
        >
          Delete
        </Button>
      </>
    );
  };

  const displayImage = (cell, row) => {
    return (
      row.image && (
        <Image
          src={row.image}
          height="50"
          width="50"
          className="rounded border border-secondary"
          alt="book image"
        />
      )
    );
  };

  return (
    <Container style={{ padding: 5, width: "90%" }} fluid>
      <Card.Title className="title">Book List</Card.Title>
      <Row style={{ marginBottom: "10px" }}>
        <Col sm="10">
          <Button onClick={() => history.push("/book")}>Add Book</Button>
        </Col>
        <Col className="pl-113">
          <Button onClick={() => history.push("/")}>Logout</Button>
        </Col>
      </Row>

      <BootstrapTable data={bookList} hover search={true} pagination>
        <TableHeaderColumn dataField="title" isKey={true}>
          Title
        </TableHeaderColumn>
        <TableHeaderColumn dataField="author">Author</TableHeaderColumn>
        <TableHeaderColumn dataField="price" dataSort={true}>
          Price
        </TableHeaderColumn>
        <TableHeaderColumn dataField="category" filter={{ type: "TextFilter" }}>
          Category
        </TableHeaderColumn>
        <TableHeaderColumn dataField="description">
          Description
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="ratings"
          dataSort={true}
          filter={{ type: "TextFilter" }}
        >
          Ratings
        </TableHeaderColumn>
        <TableHeaderColumn dataField="image" dataFormat={displayImage}>
          Image
        </TableHeaderColumn>
        <TableHeaderColumn dataField="Action" dataFormat={cellButton}>
          Actions
        </TableHeaderColumn>
      </BootstrapTable>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete this book ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Dashboard;
