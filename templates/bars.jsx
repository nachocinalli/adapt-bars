
import React from 'react';

import { classes, compile, templates } from 'core/js/reactHelpers';

export default function Bars (props) {

  return (
    <div className="component__inner bars__inner">

      <templates.header {...props} />

      <div className="component__widget bars__widget">

        {props._items.map(({ _index, title, percent, label, _isActive, _classes }, index) =>

          <div className={classes([
            'bars-item',
            `bars-item-${_index}`,
            _isActive && 'is-animating',
            _classes
          ])}
          key={_index}>
            {title && <div className="bars-item-title" dangerouslySetInnerHTML={{ __html: compile(title) }}></div>
            }

            <div className="bars-item-progress">
              <div className="bars-item-progress-bar"
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label={label !== '' ? label : title}
                style={{ width: `${percent}%` }}
                dangerouslySetInnerHTML={{ __html: compile(label !== '' ? label : `${percent}%`) }}>
              </div>
            </div>
          </div>

        )}

      </div>

    </div>
  );
}
