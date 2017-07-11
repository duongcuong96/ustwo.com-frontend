import React, { Component } from 'react';
import classnames from 'classnames';
import SVG from 'app/components/svg';

class TestimonialCarousel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numberOfItems: this.props.testimonials.length,
      currentItem: 0
    };
  }

  nextItem() {
    const { numberOfItems, currentItem } = this.state;

    if (currentItem === numberOfItems - 1) {
      this.setState({ currentItem: 0 })
    } else {
      this.setState({ currentItem: currentItem + 1 });
    }
  }

  renderTestimonials() {
    const { style } = this.props;
    return this.props.testimonials.map((testimonial, i) => {
      const classes = classnames('testimonial-item', {
        active: i === this.state.currentItem
      });

      let icon;
      if (style === 'twitter-auto') {
        icon = (
          <div className="testimonial-icon">
            <SVG
              className="logo"
              title="twitter logo"
              spritemapID="twitter"
            />
          </div>
        );
      }

      return (
        <div key={`testimonial-${i}`} className={classes}>
          {icon}
          <p>{testimonial.testimonial}</p>
          <div className="testimonial-name">{testimonial.source.name}</div>
          <div className="testimonial-smallprint">
            <span className="testimonial-title">{testimonial.source.title}&nbsp;</span>
            <span className="testimonial-company">{testimonial.source.company}</span>
          </div>
        </div>
      );
    });
  }

  render() {
    const { fixedHeight, style } = this.props;
    const classes = classnames('testimonial-carousel', {
      twitterAuto: style === 'twitter-auto'
    });

    let styles;
    if (fixedHeight) {
      styles = { height: `${fixedHeight}px` }
    }

    return (
      <section className={classes} style={styles}>
        <div className="testimonial-content">
          {this.renderTestimonials()}
        </div>
        <button className="tesimonial-button-next" onClick={() => this.nextItem()}>
          <SVG spritemapID="shuffle" />
        </button>
      </section>
    );
  }
};

export default TestimonialCarousel;
