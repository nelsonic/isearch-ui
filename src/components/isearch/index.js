import React, { PropTypes, Component } from 'react';
import Header from '../../../lib/header/';
import SearchSummary from '../../../lib/search-summary/';
import Tags from '../../../lib/tags/';
import SearchResults from '../search-results';
import LoadingSpinner from '../../../lib/spinner';
import HotelPage from '../../../lib/hotel-page';
import mockPackageOffer from '../../utils/mock-package-offer';

class ISearch extends Component {

  constructor () {
    super();
    this.fetchQueryResults = this.fetchQueryResults.bind(this);
  }

  componentWillMount () {
    this.fetchQueryResults();
  }

  /**
   * For testing and building purposes we pass through a list of fixed tags.
   * TODO: Replace this with the proper solution!
   */

   fetchQueryResults () {
     this.props.fetchQuerySearchResults(12345, 1, 20, 1);
   }

  renderResults () {
    const {
      displayedItems,
      onYesFilter,
      onFilterClick,
      showAddMessage,
      filterVisibleState,
      loading,
      error,
      viewHotel
    } = this.props;

    if (loading) {
      return <LoadingSpinner />;
    } else if (error) {
      return <div className='errorMessage'>{error}</div>;
    } else {
      return (
        <SearchResults
          items={displayedItems}
          onYesFilter={onYesFilter}
          onFilterClick={onFilterClick}
          filterVisibleState={filterVisibleState}
          showAddMessage={showAddMessage}
          error={error}
          viewHotel={viewHotel}
        />
      );
    }
  }

  render () {
    const {
      tags,
      removeTag,
      setSearchString,
      startSearch,
      addSearchStringTag,
      hotelPage,
      backToSearch
    } = this.props;
    if (!hotelPage) {
      return (
        <section>
          <SearchSummary
            city='Bodrum'
            country='Turkey'
            durationInWeeks={1}
            paxMix='2 adults, 2 children'
            departureDate='Sun 13 jul 2016'
            returnDate='Tue 15 jul 2016'
          />
          <Header />
          <Tags
            tags={tags}
            removeTag={removeTag}
            onSearchButtonClick={() => { addSearchStringTag(); startSearch(); }}
            setSearchString={setSearchString}
          />
          { this.renderResults() }
        </section>
      );
    } else {
      return (
        <HotelPage
          backToSearch={backToSearch}
          packageOffer={mockPackageOffer}
        />
      );
    }
  }
}

ISearch.propTypes = {
  tags: PropTypes.array,
  displayedItems: PropTypes.array,
  onYesFilter: PropTypes.func,
  onFilterClick: PropTypes.func,
  showAddMessage: PropTypes.func,
  hideAddMessage: PropTypes.func,
  filterVisibleState: PropTypes.object,
  fetchQuerySearchResults: PropTypes.func,
  removeTag: PropTypes.func,
  setSearchString: PropTypes.func,
  searchString: PropTypes.string,
  startSearch: PropTypes.func,
  addSearchStringTag: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
  hotelPage: PropTypes.bool,
  viewHotel: PropTypes.func,
  backToSearch: PropTypes.func
};

export default ISearch;
