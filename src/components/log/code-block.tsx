import { useContext } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { ColorModeContext } from '../core/providers/color-mode-provider/color-mode-context';
import { ColorMode } from '../core/providers/color-mode-provider/color-mode.enum';

interface CodeBlockProps {
    code: string;
    language?: string;
}

export default function CodeBlock({ code, language = '' }: CodeBlockProps) {
    const { colorMode } = useContext(ColorModeContext);
    const theme = colorMode === ColorMode.Dark ? themes.oneDark : themes.oneLight;

    return (
        <Highlight
            theme={theme}
            code={code.trim()}
            language={language}
        >
            {({ tokens, getLineProps, getTokenProps }) => (
                <pre className='bg-card border border-border rounded-lg p-4 overflow-x-auto text-xs leading-relaxed'>
                    <code>
                        {tokens.map((line, i) => (
                            <div
                                key={i}
                                {...getLineProps({ line })}
                            >
                                {line.map((token, key) => (
                                    <span
                                        key={key}
                                        {...getTokenProps({ token })}
                                    />
                                ))}
                            </div>
                        ))}
                    </code>
                </pre>
            )}
        </Highlight>
    );
}
