import React from 'react';

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

export const SVG: React.FC<ISVGProps> = ({ name, ...rest }): JSX.Element | null => {
  const ImportedSVGRef = React.useRef<React.FC<React.SVGProps<SVGSVGElement>> | any>();
  const [loading, setLoading] = React.useState(false);
  React.useEffect((): void => {
    setLoading(true);
    const importSVG = async (): Promise<void> => {
      try {
        ImportedSVGRef.current = (await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!./${name}.svg`)).default;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importSVG();
  }, [name]);

  if (!loading && ImportedSVGRef.current) {
    const { current: ImportedSVG } = ImportedSVGRef;
    return <ImportedSVG {...rest} />;
  }
  return null;
}