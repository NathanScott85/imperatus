import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Icon = ({ width = '175', height = '24' }: any) => (
    <svg width={width} height={height} viewBox="0 0 52 5" fill="none">
        <path
            d="M4.60442 0.0513574C5.01046 0.0526166 5.03799 0.331959 5.03559 1.10672L5.03017 2.85301C5.02777 3.62777 4.99851 3.90694 4.59247 3.90568L4.59235 3.94503L5.86748 3.94898L5.8676 3.90963C5.46156 3.90837 5.43403 3.62903 5.43643 2.85427L5.44185 1.10798C5.44425 0.333219 5.47351 0.0540526 5.87955 0.0553117L5.87968 0.0161404L4.60454 0.0121861L4.60442 0.0513574Z"
            fill="#C79D0A"
        />
        <mask
            id="mask0_139_2"
            maskUnits="userSpaceOnUse"
            x="0"
            y="2"
            width="6"
            height="3"
        >
            <path
                d="M0.666162 2.75894L5.99114 2.77545L5.9857 4.52843L0.660726 4.51191L0.666162 2.75894Z"
                fill="white"
            />
        </mask>
        <g mask="url(#mask0_139_2)">
            <mask
                id="mask1_139_2"
                maskUnits="userSpaceOnUse"
                x="0"
                y="2"
                width="7"
                height="3"
            >
                <path
                    d="M0.774027 2.52826L6.21604 3.33403L5.88491 4.89486L0.442902 4.0893L0.774027 2.52826Z"
                    fill="white"
                />
            </mask>
            <g mask="url(#mask1_139_2)">
                <mask
                    id="mask2_139_2"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="2"
                    width="7"
                    height="3"
                >
                    <path
                        d="M0.774027 2.52826L6.21604 3.33403L5.88491 4.89486L0.442902 4.0893L0.774027 2.52826Z"
                        fill="white"
                    />
                </mask>
                <g mask="url(#mask2_139_2)">
                    <path
                        d="M3.95645 3.89094C3.77242 3.80075 3.61993 3.68064 3.48103 3.54789C3.44178 3.56771 3.34017 3.6552 3.32679 3.68054C3.51698 3.81003 3.69819 3.94935 3.89711 4.07303C3.9297 4.01452 3.9519 3.95497 3.95645 3.89094ZM3.30592 3.70323C3.27218 3.73958 3.22575 3.81516 3.20522 3.88418C3.12089 4.16931 3.4076 4.37462 3.67229 4.2697C3.77811 4.22774 3.86013 4.1432 3.88156 4.09674C3.6824 3.97327 3.49901 3.83374 3.30592 3.70323ZM3.45836 3.52647C3.10657 3.17172 3.02363 3.08748 2.86839 2.99637C2.50914 2.78519 2.10184 2.86087 1.89902 2.97947C2.34512 3.10773 2.64229 3.21338 3.28696 3.65343C3.32027 3.67609 3.27658 3.64695 3.45836 3.52647ZM3.7249 3.60403C3.72886 3.57565 3.90629 3.61024 3.95492 3.75882C3.96715 3.79591 3.9762 3.84106 3.97668 3.84146C4.05707 3.88924 4.20926 3.95215 4.35259 3.98361C4.83189 4.08922 5.16173 3.80123 5.00327 3.57859C4.82385 3.32669 4.16814 3.17179 3.55131 3.5038C3.54767 3.5058 3.54332 3.5066 3.53944 3.50799C3.58447 3.57258 3.89309 3.80938 3.9535 3.82669C3.9521 3.81258 3.93581 3.76017 3.92451 3.73758C3.88749 3.66395 3.82233 3.61823 3.7249 3.60403ZM3.27305 3.69427C3.27888 3.68663 3.2813 3.68644 3.27309 3.68078C3.00494 3.49909 2.63736 3.24499 2.0809 3.06119C2.01856 3.04066 1.90184 3.00807 1.86267 3.00231C1.8324 3.0133 1.72474 3.10017 1.67801 3.19609C1.61472 3.32499 1.68807 3.38222 1.67402 3.38882C1.58124 3.28098 1.66326 3.11448 1.80269 3.00132C1.81263 2.9935 1.81554 2.9921 1.80611 2.99046C1.46793 2.92818 1.16274 2.98665 0.991457 3.07856C0.615691 3.28 0.77006 3.57392 0.765701 3.57572C0.667214 3.43464 0.719028 3.10531 1.17679 2.98266C1.54328 2.88451 1.83445 2.97665 1.85021 2.96602C2.08482 2.81006 2.42162 2.77344 2.68236 2.84837C3.14538 2.98132 3.47485 3.51283 3.5296 3.4838C4.14593 3.15762 4.82224 3.30312 5.01641 3.55306C5.23853 3.83873 4.74239 4.24684 3.99389 3.90838C3.96297 3.89459 3.98668 3.89305 3.9513 3.99263C3.92568 4.06425 3.90652 4.0791 3.91522 4.08456C4.18946 4.25338 4.45459 4.397 4.78597 4.4665C5.08256 4.52844 5.39193 4.52095 5.64439 4.38196C5.84355 4.27241 5.92686 4.08315 5.91432 3.99248C5.90959 3.95782 5.89126 3.94125 5.89056 3.93198C6.06411 4.04611 5.71181 4.71407 4.71339 4.47332C4.35279 4.38641 4.10488 4.22734 3.90884 4.11375C3.89338 4.10484 3.8975 4.10243 3.8873 4.1169C3.5853 4.55441 2.88329 4.19495 3.27305 3.69427Z"
                        fill="#C79D0A"
                    />
                </g>
            </g>
        </g>
        <path
            d="M12.237 3.93652H11.6774L11.5842 2.73254L11.3604 0.914783H11.3106L10.1169 3.49388H9.62576L8.50045 0.914783H8.45072L8.23933 2.68533L8.1212 3.93652H7.58653L8.0466 9.53674e-07H8.76779L8.97918 0.590183L9.88689 2.70894H9.93662L10.8879 0.560674L11.1055 9.53674e-07H11.808L12.237 3.93652Z"
            fill="#C79D0A"
        />
        <path
            d="M16.588 9.53674e-07C17.0263 9.53674e-07 17.3651 0.100332 17.6014 0.300994C17.8376 0.501656 17.9558 0.793796 17.9558 1.17446C17.9558 1.61562 17.8066 1.96236 17.5081 2.21318C17.2128 2.46549 16.8056 2.5909 16.2833 2.5909H15.7735V2.71484L15.7922 3.94832H15.1767L15.2016 2.76205L15.1767 0.0118046L16.588 9.53674e-07ZM16.4823 2.13056C17.0325 2.04056 17.3092 1.73809 17.3092 1.22168C17.3092 0.973802 17.2346 0.78937 17.0854 0.666907C16.9393 0.54592 16.7201 0.478049 16.4263 0.466245L15.7922 0.478049L15.7798 2.11285L16.4823 2.13056Z"
            fill="#C79D0A"
        />
        <path
            d="M23.2538 3.42896L23.3035 3.47617L23.2476 3.93652H20.7234L20.7483 2.75025L20.7234 9.53674e-07H23.26L23.3035 0.0472155L23.2538 0.501656L22.2031 0.472147L21.3389 0.478049L21.3265 1.67612L22.1533 1.68202L22.8808 1.65841L22.9181 1.71153L22.8683 2.18368L22.1036 2.16007L21.3265 2.16597L21.3202 2.70304L21.3265 3.45257L22.1471 3.46437L23.2538 3.42896Z"
            fill="#C79D0A"
        />
        <path
            d="M27.9144 2.36073C28.2532 2.84911 28.6294 3.33158 29.0397 3.80668L29.0335 3.8834C28.8003 3.95422 28.6107 3.99258 28.4615 4.00144L28.3496 3.94242C27.9268 3.33748 27.6066 2.85943 27.3921 2.50828L26.6088 2.51418V2.71484L26.6274 3.94832H26.0119L26.0368 2.76205L26.0119 0.0118046L27.4232 9.53674e-07C27.8615 9.53674e-07 28.2004 0.0988566 28.4366 0.295092C28.6729 0.492803 28.791 0.77314 28.791 1.13905C28.791 1.41054 28.7133 1.65251 28.561 1.86498C28.4071 2.07449 28.1911 2.23974 27.9144 2.36073ZM26.615 2.02433L27.3984 2.04793C27.8957 1.91809 28.1444 1.63185 28.1444 1.18627C28.1444 0.954621 28.0714 0.781993 27.9268 0.666907C27.7807 0.54887 27.5616 0.486901 27.2678 0.478049L26.6274 0.48395L26.615 2.02433Z"
            fill="#C79D0A"
        />
        <path
            d="M35.0414 3.93652H34.4135L34.314 3.51159L34.0964 2.9214L33.1079 2.9155L32.225 2.9214L31.995 3.47617L31.8831 3.93652H31.2614L32.8654 9.53674e-07H33.5804L35.0414 3.93652ZM33.9223 2.44336L33.2322 0.57838H33.1825L32.424 2.44336L33.1576 2.44926L33.9223 2.44336Z"
            fill="#C79D0A"
        />
        <path
            d="M40.3619 0.0472155L40.3184 0.542969L39.5413 0.489852H39.1247L39.0998 2.70304L39.1247 3.93652H38.503L38.5279 2.75025L38.5092 0.489852H38.0927L37.3031 0.542969L37.2533 0.489852L37.3031 9.53674e-07H40.3246L40.3619 0.0472155Z"
            fill="#C79D0A"
        />
        <path
            d="M46.2329 2.00072V2.56729C46.236 3.01583 46.0914 3.36404 45.7977 3.61192C45.507 3.85979 45.0905 3.98373 44.548 3.98373C44.0087 3.98373 43.5968 3.86274 43.3108 3.61782C43.0279 3.36994 42.8942 3.02026 42.9067 2.56729L42.9129 1.96531L42.9067 9.53674e-07H43.5346L43.4973 2.47286C43.4927 2.80779 43.5797 3.0601 43.7584 3.2283C43.9403 3.39355 44.2123 3.47617 44.5729 3.47617C44.9288 3.47617 45.1977 3.39355 45.3811 3.2283C45.563 3.0601 45.6516 2.80779 45.6485 2.47286L45.6236 9.53674e-07H46.2577L46.2329 2.00072Z"
            fill="#C79D0A"
        />
        <path
            d="M50.5062 9.53674e-07C50.8419 9.53674e-07 51.1792 0.0634456 51.5196 0.188859L51.4139 0.77314L51.3144 0.796747C51.1559 0.683137 51.0067 0.599036 50.8668 0.542969C50.73 0.488377 50.587 0.460343 50.4378 0.460343C50.1969 0.460343 50.0057 0.519361 49.8658 0.637398C49.729 0.755434 49.6607 0.891176 49.6607 1.04462C49.6607 1.19807 49.729 1.32201 49.8658 1.41644C50.0026 1.51087 50.2109 1.61563 50.4938 1.72924C50.7456 1.83547 50.9445 1.93285 51.0906 2.01842C51.2398 2.10105 51.3673 2.21318 51.4761 2.35483C51.5833 2.49352 51.6377 2.66172 51.6377 2.86239C51.6377 3.06747 51.5787 3.25781 51.4636 3.43486C51.3471 3.61192 51.1745 3.75651 50.9476 3.86569C50.7238 3.97193 50.4565 4.02504 50.1456 4.02504C49.9498 4.02504 49.7446 4.00291 49.5301 3.96012C49.3187 3.91291 49.1213 3.84504 48.9395 3.75356L49.0141 3.13387L49.0949 3.09846C49.2519 3.24895 49.4337 3.36404 49.642 3.44667C49.8487 3.52634 50.0415 3.5647 50.2202 3.5647C50.4518 3.5647 50.643 3.50568 50.7922 3.38765C50.9445 3.26961 51.0222 3.12649 51.0222 2.95681C51.0222 2.80042 50.9538 2.67353 50.8171 2.5791C50.6803 2.48467 50.4658 2.37548 50.1767 2.2486C49.9404 2.14679 49.7446 2.05384 49.5923 1.97121C49.4384 1.88563 49.3078 1.7735 49.2006 1.63481C49.0964 1.49316 49.0452 1.32201 49.0452 1.12135C49.0452 0.913308 49.1042 0.72445 49.2255 0.554772C49.3451 0.386571 49.5146 0.252304 49.7353 0.153448C49.9544 0.051642 50.2109 9.53674e-07 50.5062 9.53674e-07Z"
            fill="#C79D0A"
        />
    </svg>
);
