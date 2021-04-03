import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Image,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBook, updateBook } from "../redux/actions";

function AddUpdateBook(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [title, setTitle] = useState(
    props.location.state ? props.location.state.data.title : ""
  );
  const [price, setPrice] = useState(
    props.location.state ? props.location.state.data.price : ""
  );
  const [file, setFile] = useState(
    props.location.state ? props.location.state.data.image : ""
  );
  const [author, setAuthor] = useState(
    props.location.state ? props.location.state.data.author : ""
  );
  const [description, setDescription] = useState(
    props.location.state ? props.location.state.data.description : ""
  );
  const [category, setCategory] = useState(
    props.location.state ? props.location.state.data.category : ""
  );
  const [ratings, setRatings] = useState(
    props.location.state ? props.location.state.data.ratings : ""
  );
  const [validated, setValidated] = useState(false);
  const handleImage = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      event.preventDefault();
    } else {
      setValidated(false);
      let params = {
        title: title,
        price: price,
        image: file,
        author: author,
        ratings: ratings,
        description: description,
        category: category,
      };

      event.preventDefault();
      if (props.location.state && props.location.state.data.id) {
        dispatch(updateBook(props.location.state.data.id, params, history));
      } else {
        dispatch(addBook(params, history));
      }
    }
  };

  return (
    <Container className="py-3">
      <Card.Title style={{ fontSize: "x-large" }}>
        {props.location.state ? "Edit Book" : "Add Book"}
      </Card.Title>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter title"
            required
            value={title}
          />
          <Form.Control.Feedback type="invalid">
            Please enter title
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter description
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                placeholder="Enter price"
                required
                value={price}
              />
              <Form.Control.Feedback type="invalid">
                Please enter price
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Author</Form.Label>
              <Form.Control
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
                placeholder="Enter author name"
                required
                value={author}
              />
              <Form.Control.Feedback type="invalid">
                Please enter author name
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Ratings</Form.Label>
              <Form.Control
                onChange={(e) => setRatings(e.target.value)}
                type="text"
                placeholder="Enter rating"
                value={ratings}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <Form.Control
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="Enter category"
                value={category}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter category
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <Form.File
            type="file"
            id="image"
            label="Select Book Image"
            onChange={handleImage}
          />
          {file && <Image src={file} alt="book image" className="avatar" />}
          <Form.Control.Feedback type="invalid">
            Please choose a book image.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          {props.location.state ? "Update" : "Submit"}
        </Button>
      </Form>
    </Container>
  );
}

export default AddUpdateBook;
