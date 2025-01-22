import { useContext, useEffect, useState } from 'react';
import { ColorModeContext } from '../../core/providers/color-mode-provider/color-mode-provider';
import { ColorMode } from '../../core/providers/color-mode-provider/color-mode.enum';
import { articles } from '../articles-json/articles-array';
import { Link } from 'react-router-dom';

export default function ArticlesList() {
    const colorModeContext = useContext(ColorModeContext);
    const [isHovered, setIsHovered] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');

        const handleResize = () => {
            setIsMobile(mediaQuery.matches);
        };

        handleResize();
        mediaQuery.addEventListener('change', handleResize);

        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []);

    return (
        <>
            <Link to={'/articles'}>
                <div className='text-2xl text-center mb-2'>Latest Articles</div>
            </Link>

            <div>
                {articles.slice(0, 5).map((article, index) => (
                    <div
                        key={index}
                        className='py-6 px-4 border-b border-accent last:border-b-0 cursor-pointer'
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        <Link
                            to={'/articles/' + article.route}
                            key={index}
                        >
                            <h2 className='text-xl font-semibold flex items-center justify-between'>
                                {isMobile ? (
                                    <>
                                        <div className='max-w-full'>{article.title}</div>
                                        <div>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 32 32'
                                                className='w-6 h-6'
                                                fill={colorModeContext.colorMode === ColorMode.Dark ? 'white' : 'black'}
                                            >
                                                <path
                                                    d='M31 0H15v2h13.59L.29 30.29 1.7 31.7 30 3.41V16h2V1a1 1 0 0 0-1-1z'
                                                    data-name='5-Arrow Up'
                                                />
                                            </svg>
                                        </div>
                                    </>
                                ) : (
                                    <div className={`max-w-full ${isHovered === index ? 'underline' : ''}`}>
                                        {article.title}
                                    </div>
                                )}
                            </h2>

                            {isHovered === index && !isMobile && (
                                <>
                                    <p className='text-sm line-clamp-2 overflow-ellipsis text-muted-foreground'>
                                        {article.date} - {article.description}
                                    </p>
                                    <div className='mt-2 flex flex-wrap gap-2'>
                                        {article.tags.map((item, index) => (
                                            <span
                                                key={index}
                                                className='px-2 py-1 text-xs font-medium bg-secondary rounded-full '
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
