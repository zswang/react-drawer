import * as React from 'react';

export interface IDrawerProps {
  /**
   * 类名前缀
   */
  prefixCls?: string;
  /**
   * 是否显示覆盖层
   */
  noOverlay?: boolean;
  /**
   * 出现方位
   */
  position?: 'left' | 'right';
}

export interface IDrawerState {
  /**
   * 滑动状态
   */
  status: 'close' | 'closing' | 'open' | 'opening';
}

/**
 * 抽屉工具
 */
export default class Drawer extends React.Component<IDrawerProps, any> {
  static displayName = '@zswang/react-drawer';

  static defaultProps: IDrawerProps = {
    prefixCls: 'react-drawer',
    noOverlay: false,
    position: 'right',
  };

  state: IDrawerState = {
    status: 'close',
  };

  /**
   * 容器元素
   */
  private drawerElement: HTMLDivElement;

  constructor(props: IDrawerProps, context?: any) {
    super(props, context);

    this.handlerAnimationEnd = this.handlerAnimationEnd.bind(this);
    this.handlerOverlayClick = this.handlerOverlayClick.bind(this);
  }

  handlerOverlayClick() {
    this.close();
  }

  handlerAnimationEnd() {
    switch (this.state.status) {
      case 'opening':
        this.setState({
          status: 'open',
        });
        break;
      case 'closing':
        this.setState({
          status: 'close',
        });
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    this.drawerElement.addEventListener(
      'webkitAnimationEnd',
      this.handlerAnimationEnd,
    );
    this.drawerElement.addEventListener(
      'animationend',
      this.handlerAnimationEnd,
    );
  }

  /**
   * 打开抽屉
   */
  open() {
    if (this.state.status === 'open') {
      return;
    }
    this.setState({
      status: 'opening',
    });
  }

  /**
   * 关闭抽屉
   */
  close() {
    if (this.state.status === 'close') {
      return;
    }
    this.setState({
      status: 'closing',
    });
  }

  render() {
    const {
      handlerOverlayClick,
      props: { prefixCls, children, noOverlay, position },
      state: { status },
    } = this;
    return (
      <div className={`${prefixCls} ${prefixCls}-${status}`}>
        {!noOverlay ? (
          <div
            className={`${prefixCls}-overlay`}
            onClick={handlerOverlayClick}
          />
        ) : null}
        <div
          className={`${prefixCls}-content ${prefixCls}-${position}`}
          ref={element => (this.drawerElement = element as HTMLDivElement)}
        >
          {children}
        </div>
      </div>
    );
  }
}
