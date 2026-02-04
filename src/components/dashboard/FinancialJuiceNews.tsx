"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './FinancialJuiceNews.module.scss';
import FinancialJuiceNewsSkeleton from './FinancialJuiceNewsSkeleton';

export default function FinancialJuiceNews() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptLoadedRef = useRef(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Prevent loading script multiple times
        if (scriptLoadedRef.current) {
            // If script already loaded, check if widget is ready
            setTimeout(() => {
                const iframe = containerRef.current?.querySelector('iframe');
                if (iframe) {
                    setIsLoading(false);
                }
            }, 1000);
            return;
        }

        const containerId = 'financialjuice-news-widget-container';

        // Function to inject styles into iframe (if accessible)
        const injectIframeStyles = () => {
            if (containerRef.current) {
                const iframe = containerRef.current.querySelector('iframe');
                if (iframe) {
                    // Try multiple methods to access iframe content
                    let iframeDoc: Document | null = null;

                    try {
                        iframeDoc = iframe.contentDocument || (iframe as any).contentDocument;
                    } catch (e) {
                        // Try alternative method
                        try {
                            iframeDoc = (iframe as any).contentWindow?.document;
                        } catch (e2) {
                            // Cross-origin - cannot access
                        }
                    }

                    if (iframeDoc) {
                        // Create or update style element
                        let styleEl = iframeDoc.getElementById('custom-financialjuice-styles');
                        if (!styleEl) {
                            styleEl = iframeDoc.createElement('style');
                            styleEl.id = 'custom-financialjuice-styles';
                            if (iframeDoc.head) {
                                iframeDoc.head.appendChild(styleEl);
                            } else {
                                // If head doesn't exist, wait for it
                                const checkHead = setInterval(() => {
                                    if (iframeDoc && iframeDoc.head) {
                                        iframeDoc.head.appendChild(styleEl!);
                                        clearInterval(checkHead);
                                    }
                                }, 100);
                                setTimeout(() => clearInterval(checkHead), 5000);
                            }
                        }

                        // Add custom styles to hide powered-by
                        if (styleEl) {
                            styleEl.textContent = `
                                #powered-by {
                                    display: none !important;
                                    visibility: hidden !important;
                                    opacity: 0 !important;
                                    height: 0 !important;
                                    overflow: hidden !important;
                                    position: absolute !important;
                                    left: -9999px !important;
                                }
                            `;
                        }

                        // Function to hide powered-by element
                        const hidePoweredBy = () => {
                            try {
                                if (!iframeDoc) return false;

                                const poweredBy = iframeDoc.getElementById('powered-by');
                                if (poweredBy) {
                                    poweredBy.style.display = 'none';
                                    poweredBy.style.visibility = 'hidden';
                                    poweredBy.style.opacity = '0';
                                    poweredBy.style.height = '0';
                                    poweredBy.style.overflow = 'hidden';
                                    poweredBy.style.position = 'absolute';
                                    poweredBy.style.left = '-9999px';
                                    // Also try to remove it
                                    try {
                                        poweredBy.remove();
                                    } catch (e) {
                                        // Can't remove, but we've hidden it
                                    }
                                    return true;
                                }
                            } catch (e) {
                                // Element not accessible
                            }
                            return false;
                        };

                        // Try multiple times with different delays to catch the element when it loads
                        const delays = [100, 300, 500, 1000, 1500, 2000, 3000, 5000];
                        delays.forEach(delay => {
                            setTimeout(() => {
                                hidePoweredBy();
                            }, delay);
                        });

                        // Also set up a MutationObserver to watch for when the element is added
                        try {
                            const targetNode = iframeDoc.body || iframeDoc.documentElement;
                            if (targetNode) {
                                const iframeObserver = new MutationObserver(() => {
                                    hidePoweredBy();
                                });
                                iframeObserver.observe(targetNode, {
                                    childList: true,
                                    subtree: true,
                                    attributes: true,
                                    attributeFilter: ['style', 'id', 'class']
                                });

                                // Keep observer running longer
                                setTimeout(() => {
                                    iframeObserver.disconnect();
                                }, 10000);
                            }
                        } catch (e) {
                            // Observer not supported or body not available
                        }
                    } else {
                        // Iframe is cross-origin - cannot access content
                        // This is a browser security restriction
                    }
                }
            }
        };

        // Function to override width and height styles
        const overrideStyles = () => {
            if (containerRef.current) {
                containerRef.current.style.width = '100%';
                containerRef.current.style.height = '600px';

                // Also check for any child elements (especially iframe) that might have styles set
                const iframe = containerRef.current.querySelector('iframe');
                if (iframe && iframe instanceof HTMLElement) {
                    iframe.style.width = '100%';
                    iframe.style.height = '600px';
                    // Also set height attribute
                    iframe.setAttribute('height', '600');

                    // Try to inject styles into iframe when it loads
                    const tryInjectStyles = () => {
                        injectIframeStyles();
                        // Keep trying at intervals
                        const intervals = [500, 1000, 2000, 3000, 5000];
                        intervals.forEach(interval => {
                            setTimeout(() => {
                                injectIframeStyles();
                            }, interval);
                        });
                    };

                    iframe.addEventListener('load', () => {
                        tryInjectStyles();
                    });

                    // Also try immediately and check if already loaded
                    if (iframe.contentDocument || (iframe as any).contentWindow) {
                        tryInjectStyles();
                    } else {
                        // Iframe not loaded yet, try after a delay
                        setTimeout(tryInjectStyles, 1000);
                    }
                }

                const widgetFrame = containerRef.current.querySelector('div[style*="width"]');
                if (widgetFrame && widgetFrame instanceof HTMLElement) {
                    widgetFrame.style.width = '100%';
                    if (!widgetFrame.style.height || widgetFrame.style.height === '') {
                        widgetFrame.style.height = '600px';
                    }
                }
            }
        };

        // Set up MutationObserver to watch for style changes and iframe loading
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    overrideStyles();
                }
                // Also watch for child nodes being added (like iframe)
                if (mutation.type === 'childList') {
                    overrideStyles();
                    // Check if iframe was added and try to inject styles when it loads
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeName === 'IFRAME') {
                            const iframe = node as HTMLIFrameElement;
                            iframe.addEventListener('load', () => {
                                setTimeout(injectIframeStyles, 500);
                                // Hide skeleton when iframe loads
                                setIsLoading(false);
                            });
                            // Also try immediately
                            setTimeout(injectIframeStyles, 1000);
                        }
                    });
                }
            });
        });

        // Start observing the container
        if (containerRef.current) {
            observer.observe(containerRef.current, {
                attributes: true,
                attributeFilter: ['style', 'height', 'width'],
                subtree: true,
                childList: true,
            });
        }

        // Check if script already exists
        const existingScript = document.getElementById('FJ-Widgets');
        if (existingScript) {
            // Script already loaded, just initialize widget
            if (window.FJWidgets && containerRef.current) {
                const options = {
                    container: containerId,
                    mode: 'Light',
                    width: '100%',
                    height: '600px',
                    backColor: '1e222d',
                    fontColor: 'b2b5be',
                    widgetType: 'NEWS',
                };
                window.FJWidgets.createWidget(options);

                // Override inline styles after widget initializes
                setTimeout(overrideStyles, 100);
                setTimeout(overrideStyles, 500);
                setTimeout(overrideStyles, 1000);
                setTimeout(overrideStyles, 2000); // Additional delay for iframe content to load

                // Check if iframe exists and is already loaded
                setTimeout(() => {
                    const iframe = containerRef.current?.querySelector('iframe');
                    if (iframe) {
                        // Check if iframe is loaded
                        try {
                            if (iframe.contentDocument || (iframe as any).contentWindow) {
                                setIsLoading(false);
                            }
                        } catch (e) {
                            // Cross-origin, but iframe exists - assume it's loaded
                            setIsLoading(false);
                        }
                    }
                }, 2000);

                // Fallback: Hide skeleton after 5 seconds even if load event doesn't fire
                setTimeout(() => {
                    setIsLoading(false);
                }, 5000);
            }
            return;
        }

        // Load FinancialJuice widget script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'FJ-Widgets';
        const r = Math.floor(Math.random() * (9999 - 0 + 1) + 0);
        script.src = `https://feed.financialjuice.com/widgets/widgets.js?r=${r}`;

        script.onload = function () {
            scriptLoadedRef.current = true;

            if (window.FJWidgets && containerRef.current) {
                const options = {
                    container: containerId,
                    mode: 'Light',
                    width: '100%',
                    height: '600px',
                    backColor: '1e222d',
                    fontColor: 'b2b5be',
                    widgetType: 'NEWS',
                };
                window.FJWidgets.createWidget(options);

                // Override inline styles after widget initializes
                setTimeout(overrideStyles, 100);
                setTimeout(overrideStyles, 500);
                setTimeout(overrideStyles, 1000);
                setTimeout(overrideStyles, 2000); // Additional delay for iframe content to load

                // Check if iframe exists and is already loaded
                setTimeout(() => {
                    const iframe = containerRef.current?.querySelector('iframe');
                    if (iframe) {
                        // Check if iframe is loaded
                        try {
                            if (iframe.contentDocument || (iframe as any).contentWindow) {
                                setIsLoading(false);
                            }
                        } catch (e) {
                            // Cross-origin, but iframe exists - assume it's loaded
                            setIsLoading(false);
                        }
                    }
                }, 2000);

                // Fallback: Hide skeleton after 5 seconds even if load event doesn't fire
                setTimeout(() => {
                    setIsLoading(false);
                }, 5000);
            }
        };

        document.getElementsByTagName('head')[0].appendChild(script);

        // Cleanup function
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section className={styles["financialjuice-news"]}>
            <h1 className={styles["financialjuice-news__heading"]}>Trading News Worldwide</h1>
            <div className={styles["financialjuice-news__widget-container"]}>
                {isLoading && <FinancialJuiceNewsSkeleton />}
                <div
                    ref={containerRef}
                    id="financialjuice-news-widget-container"
                    className={styles["financialjuice-news__widget"]}
                    style={{
                        opacity: isLoading ? 0 : 1,
                        visibility: isLoading ? 'hidden' : 'visible'
                    }}
                ></div>
            </div>
        </section>
    );
}
