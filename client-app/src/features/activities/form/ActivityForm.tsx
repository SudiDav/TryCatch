import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props{
  activity: Activity | undefined
  closeForm: () => void;
}



export default function ActivityForm({closeForm, activity: selectActivity}: Props) {

    const initialState = selectActivity ?? {
      id: '',
      title: '',
      category: '',
      description: '',
      date: '',
      city: '',
      venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
      console.log(activity)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      const {value, name} = event.target;
      setActivity({...activity, [name]: value});
    }

    return (
        <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input
          name="title"
          placeholder="Title"
          value={activity.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          name="description"
          rows={2}
          placeholder="Description"
          value={activity.description}
          onChange={handleInputChange}
        />
        <Form.Input
          name="category"
          placeholder="Category"
          value={activity.category}
          onChange={handleInputChange}
        />
        <Form.Input
          name="date"
          type="Date"
          placeholder="Date"
          value={activity.date}
          onChange={handleInputChange}
        />
        <Form.Input
          name="city"
          placeholder="City"
          value={activity.city}
          onChange={handleInputChange}
        />
        <Form.Input
          name="venue"
          placeholder="Venue"
          value={activity.venue}
          onChange={handleInputChange}
        />
        <Button floated="left" positive type="submit" content="Submit" />
        <Button
          onClick={closeForm}
          floated="right"
          type="submit"
          content="Cancel"
          color="red"
        />
      </Form>
    </Segment>
    )
}
