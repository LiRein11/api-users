declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
    import React = require('react');

    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}
