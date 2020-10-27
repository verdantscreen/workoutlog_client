import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Label,
  Input,
} from "reactstrap";

const WorkoutEdit = (props) => {
  const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
  const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
  const [editRes, setEditRes] = useState(props.workoutToUpdate.result);

  const workoutUpdate = (event, workout) => {
    event.preventDefault();
    fetch(`http://localhost:3001/log/${props.workoutToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
        logdata: {
          description: editDesc,
          definition: editDef,
          result: editRes,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": props.token,
      }),
    }).then((res) => {
      props.fetchWorkouts();
      props.updateOff();
    });
  };
  return (
    <Modal isOpen={true}>
      <ModalHeader>Log a Workout</ModalHeader>
      <ModalBody>
        <Form onSubmit={workoutUpdate}>
          <FormGroup>
            <Label htmlFor="result">Edit Result:</Label>
            <Input
              name="result"
              value={editRes}
              onChange={(e) => setEditRes(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Edit Description:</Label>
            <Input
              name="description"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="definition">Edit Definition:</Label>
            <Input
              name="definition"
              value={editDef}
              onChange={(e) => setEditDef(e.target.value)}
            />
          </FormGroup>
          <Button type="submit">Update Workout</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default WorkoutEdit;
