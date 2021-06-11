import React, {Component} from 'react'
import { Tween } from 'react-gsap'
//import { CSSTransition } from "react-transition-group"
import defaultPortfolioImg from "../img/portfolio_placeholder.png"


const PortfolioList = ({items, onRemovePortfolioItem, isEditable, activeCategory}) => {

  const removePortfolio = item => {
    const result = window.confirm(`You want to delete ${item.name}?`)
    if (result) {  onRemovePortfolioItem(item) }
  }

  const portfolioItems = items.filter(item => activeCategory === item.metadata.category.toLowerCase() || activeCategory === "all" );

  return(
    <div className="portfolio_list">
      <Tween
        stagger={0.1}
        staggerFrom={{ 
          opacity: 0,
          y:150,
          scale:0,
          rotation:-20
        }}
        duration={.5}
      >
        { 
          portfolioItems.length ? 
            portfolioItems.map((item,i) => 
              <article key={item.key} className={"portfolio_item " + item.metadata.category.toLowerCase()} >
                {isEditable && 
                  <button
                    className="button button_default button_small remove_portfolio_item"
                    onClick={() => removePortfolio(item)}><i className="fas fa-times"></i></button>}
                  <a href={item.metadata.url} target="_blank">
                  <figure>
                    <img
                      src={item.img_downloadURL || defaultPortfolioImg}
                      alt=""
                    />
                    <figcaption>
                      <div className="item_content">
                        <h4 className="title">{item.metadata.title}</h4>
                      </div>
                    </figcaption>
                  </figure>
                </a>
              </article>
            )
            :
            <div>Nothing Yet!!</div> 
        }
      </Tween>
    </div>
  )
}

export default PortfolioList