import React, { useState, useEffect } from 'react';

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  src: string;
}

export const SVG: React.FC<ISVGProps> = ({ src, ...rest }): JSX.Element | null => {
  const ImportedSVGRef = React.useRef<React.FC<React.SVGProps<SVGSVGElement>> | any>();
  const [loading, setLoading] = useState(false);
  useEffect((): void => {
    setLoading(true);
    const importSVG = async (): Promise<void> => {
      try {
        ImportedSVGRef.current = (await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!../../assets/${src}`)).default;
        //ImportedSVGRef.current = (await import(`../../assets/${src}`)).ReactComponent;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importSVG();
  }, [src]);

  if (!loading && ImportedSVGRef.current && src.substr(src.lastIndexOf('.') + 1) === 'svg') {
    const { current: ImportedSVG } = ImportedSVGRef;
    return <ImportedSVG {...rest} />;
  }
  return null;
}