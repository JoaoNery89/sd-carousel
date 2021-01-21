import React, { Component } from "react"
import SliderControl from "./slider-control"
import SliderItem from "./slider-item"
import SdBitmovinPlayer from '../bitmovin/SdBitmovinPlayer'

require("./style.scss")

export class slider extends Component {
  constructor() {
    super()
    this.state = {
      sliderHasMoved: false,
      sliderMoveDirection: null,
      sliderMoving: false, // animação
      movePercentage: 0, // controle do offset 
      lowestVisibleIndex: 0,
      itemsInRow: 5,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize)
    this.handleWindowResize()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize)
  }

  // validar a quantidade a depender do tamanho da tela
  handleWindowResize = () => {
    if (window.innerWidth > 1440) {
      this.setState({ itemsInRow: 6 })
    } else if (window.innerWidth >= 1000) {
      this.setState({ itemsInRow: 5 })
    } else if (window.innerWidth < 1000) {
      this.setState({ itemsinRow: 4 })
    }
  }

  renderSliderContent = () => {
    const { sliderHasMoved, itemsInRow, lowestVisibleIndex } = this.state
    const { movies } = this.props
    const totalItems = movies.length

    const left = []
    const mid = []
    const right = []

    for (let i = 0; i < itemsInRow; i++) {
      // left
      if (sliderHasMoved) {
        if (lowestVisibleIndex + i - itemsInRow < 0) {
          left.push(totalItems - itemsInRow + lowestVisibleIndex + i)
        } else {
          left.push(i + lowestVisibleIndex - itemsInRow)
        }
      }

      // mid
      if (i + lowestVisibleIndex >= totalItems) {
        mid.push(i + lowestVisibleIndex - totalItems)
      } else {
        mid.push(i + lowestVisibleIndex)
      }

      // right
      if (i + lowestVisibleIndex + itemsInRow >= totalItems) {
        right.push(i + lowestVisibleIndex + itemsInRow - totalItems)
      } else {
        right.push(i + lowestVisibleIndex + itemsInRow)
      }
    }

    // combine para obter todos os indexs
    const combinedIndex = [...left, ...mid, ...right]

    if (sliderHasMoved) {
      const trailingIndex = combinedIndex[combinedIndex.length - 1] === totalItems - 1
        ? 0
        : combinedIndex[combinedIndex.length - 1] + 1
      combinedIndex.push(trailingIndex)
    }

    const leadingIndex = combinedIndex[0] === 0 ? totalItems - 1 : combinedIndex[0] - 1
    combinedIndex.unshift(leadingIndex)

    const sliderContents = []
    for (let index of combinedIndex) {
      sliderContents.push(
        <SliderItem movie={movies[index]}
          key={`${movies[index].id}-${index}`}
          width={100 / itemsInRow}
        />
      )
    }

    if (!sliderHasMoved) {
      for (let i = 0; i < itemsInRow; i++) {
        sliderContents.unshift(
          <div className="slider-item"
            style={{ width: `${100 / itemsInRow}%` }}
            key={i}
          />
        )
      }
    }

    return sliderContents
  }

  handlePrev = () => {
    const { lowestVisibleIndex, itemsInRow } = this.state
    const { movies } = this.props
    const totalItems = movies.length

    let newIndex;
    if (lowestVisibleIndex < itemsInRow && lowestVisibleIndex !== 0) {
      newIndex = 0
    } else if (lowestVisibleIndex - itemsInRow < 0) {
      newIndex = totalItems - itemsInRow
    } else {
      newIndex = lowestVisibleIndex - itemsInRow
    }

    let newMovePercentage;
    if (lowestVisibleIndex === 0) {
      newMovePercentage = 0
    } else if (lowestVisibleIndex - newIndex < itemsInRow) {
      newMovePercentage =
        ((itemsInRow - (lowestVisibleIndex - newIndex)) / itemsInRow) * 100
    } else {
      newMovePercentage = 0
    }

    this.setState(
      {
        sliderMoving: true,
        sliderMoveDirection: "left",
        movePercentage: newMovePercentage,
      },
      () => {
        setTimeout(() => {
          this.setState({
            lowestVisibleIndex: newIndex,
            sliderMoving: false,
            sliderMoveDirection: null,
            newMovePercentage: 0,
          });
        }, 750);
      }
    )

  }

  handleNext = () => {
    const { sliderHasMoved, lowestVisibleIndex, itemsInRow } = this.state
    const { movies } = this.props
    const totalItems = movies.length

    let newIndex;
    if (lowestVisibleIndex === totalItems - itemsInRow) {
      newIndex = 0;
    } else if (lowestVisibleIndex + itemsInRow > totalItems - itemsInRow) {
      newIndex = totalItems - itemsInRow
    } else {
      newIndex = lowestVisibleIndex + itemsInRow
    }

    let newMovePercentage
    if (newIndex !== 0) {
      newMovePercentage = ((newIndex - lowestVisibleIndex) / itemsInRow) * 100
    } else {
      newMovePercentage = 100
    }

    this.setState(
      {
        sliderMoving: true,
        sliderMoveDirection: "right",
        movePercentage: newMovePercentage,
      },
      () => {
        setTimeout(() => {
          this.setState({
            lowestVisibleIndex: newIndex,
            sliderMoving: false,
            sliderMoveDirection: null,
            movePercentage: 0,
          });
        }, 750);
      }
    )

    if (!sliderHasMoved) {
      this.setState({ sliderHasMoved: true })
    }

  }

  render() {
    const {
      sliderHasMoved,
      itemsInRow,
      sliderMoving,
      sliderMoveDirection,
      movePercentage,
    } = this.state;
    const { movies } = this.props

    if (!movies.length) {
      return null; // retornar um esqueleto com alguns itens caso venha null
    }

    let style = {}
    if (sliderMoving) {
      let translate = ""
      if (sliderMoveDirection === "right") {
        translate = `translateX(-${100 + movePercentage + 100 / itemsInRow}%)`
      } else if (sliderMoveDirection === "left") {
        translate = `translateX(-${movePercentage + 100 / itemsInRow}%)`
      }

      style = {
        transform: translate,
        transitionDuration: "750ms",
      };
    } else {
      style = {
        transform: `translateX(-${
          100 + (sliderHasMoved ? 100 / itemsInRow : 0)
        }%)`,
      };
    }
    
    return (
      <div>
        <div className="slider">
          <p className="p">Trending Now</p>
        </div>
        <div className="slider">
          {sliderHasMoved && (
            <SliderControl arrowDirection={"left"} onClick={this.handlePrev} />
          )}
          <div className="slider-content" style={style}>
            {this.renderSliderContent()}
          </div>

          <SliderControl arrowDirection={"right"} onClick={this.handleNext} />
        </div>
        
        <div id="btm-player">
          {this.SdBitmovinPlayer()}
        </div>
        
      </div>
    )
  }

}

export default slider