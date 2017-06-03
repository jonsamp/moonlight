import belle from 'belle';
import _ from 'lodash';

belle.style.button.disabledStyle = _.extend(belle.style.button.disabledStyle, {
  color: 'rgb(208, 208, 208)',
  background: '#808080',
});

belle.style.button.primaryStyle = _.extend(belle.style.button.primaryStyle, {
  background: '#1CA5F2',
  borderTop: 'none',
});

belle.style.button.primaryHoverStyle = _.extend(belle.style.button.primaryHoverStyle, {
  borderTop: 'none',
});
