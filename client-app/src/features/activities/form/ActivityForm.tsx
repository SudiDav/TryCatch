import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Button, Form, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import { v4 as uuid } from 'uuid'

export default observer(function ActivityForm() {
  const history = useHistory()
  const { activityStore } = useStore()
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore

  const { id } = useParams<{ id: string }>()

  const [activity, setActivity] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  })

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!))
  }, [id, loadActivity])

  function handleSubmit() {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      }
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      )
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      )
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value, name } = event.target
    setActivity({ ...activity, [name]: value })
  }

  if (loadingInitial) return <LoadingComponent content='Loading activity...' />

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input
          name='title'
          placeholder='Title'
          value={activity.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          name='description'
          rows={2}
          placeholder='Description'
          value={activity.description}
          onChange={handleInputChange}
        />
        <Form.Input
          name='category'
          placeholder='Category'
          value={activity.category}
          onChange={handleInputChange}
        />
        <Form.Input
          name='date'
          type='Date'
          placeholder='Date'
          value={activity.date}
          onChange={handleInputChange}
        />
        <Form.Input
          name='city'
          placeholder='City'
          value={activity.city}
          onChange={handleInputChange}
        />
        <Form.Input
          name='venue'
          placeholder='Venue'
          value={activity.venue}
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated='left'
          positive
          type='submit'
          content='Submit'
        />
        <Button floated='right' type='submit' content='Cancel' color='red' />
      </Form>
    </Segment>
  )
})
