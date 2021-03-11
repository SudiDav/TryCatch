import React, { Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { Header, Item, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import ActivityListItem from './ActivityListItem'

export default observer(function ActivityList() {
  const { activityStore } = useStore()

  const { groupedActivities } = activityStore
  return (
    <>
      {groupedActivities.map(([groupName, activities]) => (
        <Fragment key={groupName}>
          <Header sub color='violet'>
            {groupName}
          </Header>

          {activities.map((activity) => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </Fragment>
      ))}
    </>
  )
})
