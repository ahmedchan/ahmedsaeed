import React from 'react'
import classNames from 'classnames/bind'

const PortfolioFilter = props => {

  const handleChange = category => props.onCategoryChange(category)

   return (
      <div style={{ marginTop: "28px", marginBottom:'18px' }}>
         {props.portfolioCategories.map(category => (
            <button
               key={category}
               className={classNames({
                'button button_small button_primary': true,
                active: category.toLowerCase() === props.activeCategory
               })}
               onClick={() => handleChange(category.toLowerCase())}>
              {category}
            </button>
         ))}
      </div>
   )
}

export default PortfolioFilter