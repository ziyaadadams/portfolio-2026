declare module 'animejs' {
  interface AnimeParams {
    targets?: any;
    translateX?: number | string | any[];
    translateY?: number | string | any[];
    scale?: number | any[];
    scaleX?: number | any[];
    scaleY?: number | any[];
    rotate?: number | string | any[];
    rotateX?: number | string | any[];
    rotateY?: number | string | any[];
    opacity?: number | any[];
    duration?: number | any[];
    delay?: number | any[];
    easing?: string;
    loop?: boolean | number;
    direction?: 'normal' | 'reverse' | 'alternate';
    start?: () => void;
    complete?: () => void;
    update?: () => void;
  }

  interface AnimeTimeline extends AnimeParams {
    add: (params: AnimeParams) => AnimeTimeline;
  }

  function anime(params: AnimeParams): any;
  namespace anime {
    function timeline(params?: AnimeParams): AnimeTimeline;
    function stagger(delay: number, params?: any): any;
  }

  export = anime;
}
