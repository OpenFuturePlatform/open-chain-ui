import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';

interface IProps {
  children: React.ReactNode
  data: {totalCount: number, list: any[]}
  onLoadMore(): void
}

export class InfiniteScrollComponent extends React.Component<IProps, {}> {

  public onLoadMore = () => {
    this.props.onLoadMore()
  }

  public render() {
    const {children, data} = this.props

    return (
      <div className="infinity-scroll-container">
        <InfiniteScroll
          loadMore={this.onLoadMore}
          hasMore={data.totalCount > data.list.length}
          loader={<div key={0}>Loading...</div>}
          useWindow={false}
        >
          {children}
        </InfiniteScroll>
      </div>
    )
  }
}