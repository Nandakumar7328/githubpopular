import './index.css'

const LanguageFilterItem = props => {
  const {languageList, activeId, onUpdateId} = props
  const {language, id} = languageList
  const btnCss = activeId ? 'btn-decorated' : 'btn-none-decorated'

  const onClickCssUpdate = () => {
    onUpdateId(id)
  }

  return (
    <li className="li-container">
      <button className={btnCss} type="button" onClick={onClickCssUpdate}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
