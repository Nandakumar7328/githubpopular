import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const constantApiStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    apiStatus: constantApiStatus.initial,
    itemList: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: constantApiStatus.progress})
    const {activeId} = this.state

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeId}`,
    )
    const data = await response.json()

    if (response.ok === true) {
      const updateData = data.popular_repos.map(eachRepository => ({
        id: eachRepository.id,
        imageUrl: eachRepository.avatar_url,
        name: eachRepository.name,
        starsCount: eachRepository.stars_count,
        forksCount: eachRepository.forks_count,
        issuesCount: eachRepository.issues_count,
      }))
      this.setState({
        itemList: updateData,
        apiStatus: constantApiStatus.success,
      })
    } else {
      this.setState({
        apiStatus: constantApiStatus.failure,
      })
    }
  }

  onUpdateId = id => {
    this.setState({activeId: id}, this.getData)
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {itemList} = this.state
    return (
      <ul className="success-ul-container">
        {itemList.map(eachItem => (
          <RepositoryItem listItems={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderProgress = () => (
    <div testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderRepository = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case constantApiStatus.success:
        return this.renderSuccessView()
      case constantApiStatus.failure:
        return this.renderFailureView()
      case constantApiStatus.progress:
        return this.renderProgress()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state
    return (
      <div className="bg-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="language-container-ul">
          {languageFiltersData.map(eachData => (
            <LanguageFilterItem
              languageList={eachData}
              activeId={activeId === eachData.id}
              onUpdateId={this.onUpdateId}
              key={eachData.id}
            />
          ))}
        </ul>
        {this.renderRepository()}
      </div>
    )
  }
}

export default GithubPopularRepos
