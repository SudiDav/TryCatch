import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Button, FormField, Label, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import { v4 as uuid } from 'uuid'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

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

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
  })

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!))
  }, [id, loadActivity])

  // function handleSubmit() {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     }
  //     createActivity(newActivity).then(() =>
  //       history.push(`/activities/${newActivity.id}`)
  //     )
  //   } else {
  //     updateActivity(activity).then(() =>
  //       history.push(`/activities/${activity.id}`)
  //     )
  //   }
  // }

  // function handleChange(
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) {
  //   const { value, name } = event.target
  //   setActivity({ ...activity, [name]: value })
  // }

  if (loadingInitial) return <LoadingComponent content='Loading activity...' />

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => console.log(values)}>
        {({ handleSubmit }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <FormField>
              <Field name='title' placeholder='Title' />
              <ErrorMessage
                name='title'
                render={(error) => <Label basic color='red' content={error} />}
              />
            </FormField>
            <Field name='description' rows={2} placeholder='Description' />
            <Field name='category' placeholder='Category' />
            <Field name='date' type='Date' placeholder='Date' />
            <Field name='city' placeholder='City' />
            <Field name='venue' placeholder='Venue' />
            <Button
              loading={loading}
              floated='left'
              positive
              type='submit'
              content='Submit'
            />
            <Button
              floated='right'
              type='submit'
              content='Cancel'
              color='red'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  )
})
