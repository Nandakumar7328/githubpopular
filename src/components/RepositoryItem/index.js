import './index.css'

const RepositoryItem = props => {
  const {listItems} = props
  const {name, imageUrl, starsCount, forksCount, issuesCount} = listItems

  return (
    <li className="li-container-item">
      <img src={imageUrl} alt={name} className="img-item" />
      <h1 className="main-name">{name}</h1>
      <div className="sub-li-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars"
        />
        <p className="para">{starsCount} stars</p>
      </div>
      <div className="sub-li-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stars"
        />
        <p className="para">{forksCount} forks</p>
      </div>
      <div className="sub-li-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stars"
        />
        <p className="para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
