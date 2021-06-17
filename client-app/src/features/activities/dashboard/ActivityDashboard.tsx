import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Grid, Loader } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { PagingParams } from '../../../app/models/pagination'
import { useStore } from '../../../app/stores/store'
import ActivityFilters from './ActivityFilters'
import ActivityList from './ActivityList'

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore()
  const { activityRegistry, loadingActivities, setPagingParams, pagination } = activityStore
  const [loadingNext, setLoadingNext] = useState(false)

  function handleGetNext(){
    setLoadingNext(true)
    setPagingParams(new PagingParams(pagination!.currentPage + 1))
    loadingActivities().then(() => setLoadingNext(false))
  }

  useEffect(() => {
    if (activityRegistry.size <= 1) loadingActivities()
  }, [activityRegistry.size, loadingActivities])

  if (activityStore.loadingInitial && !loadingNext)
    return <LoadingComponent content='Loading activitivies...' />

  return (
    <Grid>
      <Grid.Column width={10}>
        <InfiniteScroll
         pageStart={0}
         loadMore={handleGetNext}
         hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
         initialLoad={false}
        >
            <ActivityList />
        </InfiniteScroll>     
        
        {/* <Button 
          floated='right'
          content='Load More...'
          primary
          onClick={handleGetNext}
          loading = {loadingNext}
          disabled={pagination?.totalPages === pagination?.currentPage}
        /> */}
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext}/>
      </Grid.Column>
    </Grid>
  )
})
