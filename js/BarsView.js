import ComponentView from 'core/js/views/componentView';

class BarsView extends ComponentView {

  className() {
    let classes = super.className();
    if (this.isAnimated()) {
      classes += ' is-animated';
    }
    return classes;
  }

  postRender() {
    this.setReadyStatus();
    this.setupInviewCompletion('.component__widget');
    if (this.isAnimated()) {
      this.$('.component__widget').on('onscreen.animate', this.checkIfOnScreen.bind(this));
    }
  }

  checkIfOnScreen({ currentTarget }, { percentInviewVertical }) {
    if (percentInviewVertical < this.model.get('_percentInviewVertical')) return;

    $(currentTarget).off('onscreen.animate');
    this.animateItems();
    setTimeout(this.animateProgress.bind(this), 200 * this.model.getChildren().length);
  }

  animateItems() {
    this.model.getChildren().forEach((listItem, index) => {
      setTimeout(() => {
        listItem.set('animatedPercent', listItem.get('percent'));
        if (!listItem.get('_isActive')) {
          listItem.set('percent', 0);
        }
        listItem.toggleActive(listItem, true);
      }, 200 * index);
    });
  }

  animateProgress() {
    this.model.getChildren().forEach((listItem, index) => {
      setTimeout(() => {
        listItem.set('percent', listItem.get('animatedPercent'));
      }, 200 * index);
    });
  }

  remove() {
    this.$('.component__widget').off('onscreen.animate');

    super.remove();
  }

  isAnimated() {
    return this.model.get('_animate') && (!$('html').hasClass('a11y-no-animations'));
  }
}

BarsView.template = 'bars.jsx';

export default BarsView;
