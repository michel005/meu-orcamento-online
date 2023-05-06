import React from 'react'

export const RFLogo = ({ ...props }) => {
	return (
		<svg {...props} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#filter0_d_4_3)">
				<circle cx="100" cy="100" r="80" fill="white" />
			</g>
			<circle
				cx="99.5"
				cy="99.5"
				r="73"
				transform="rotate(-90 99.5 99.5)"
				stroke="url(#paint0_linear_4_3)"
				stroke-opacity="0.3"
			/>
			<circle cx="100" cy="100" r="60" fill="url(#paint1_radial_4_3)" />
			<g filter="url(#filter1_d_4_3)">
				<path
					d="M127.92 108.968C129.968 108.968 131.568 109.544 132.72 110.696C133.936 111.848 134.544 113.448 134.544 115.496C134.544 116.008 134.512 116.552 134.448 117.128C134.384 117.64 134.256 118.088 134.064 118.472C133.232 118.344 132.304 118.248 131.28 118.184C130.256 118.056 129.04 117.992 127.632 117.992C124.752 117.992 121.872 118.248 118.992 118.76C116.112 119.272 113.36 119.688 110.736 120.008C107.856 126.792 105.488 133.16 103.632 139.112C101.776 145.064 100.336 150.952 99.312 156.776C97.136 156.264 95.216 155.336 93.552 153.992C91.888 152.648 90.32 150.76 88.848 148.328C89.296 147.304 89.84 146.088 90.48 144.68C91.12 143.208 91.888 141.384 92.784 139.208C93.68 136.968 94.736 134.28 95.952 131.144C97.232 127.944 98.736 124.136 100.464 119.72C97.776 118.824 96.016 117.256 95.184 115.016C95.504 114.696 96.4 114.344 97.872 113.96C99.344 113.512 101.136 113.032 103.248 112.52C104.208 110.024 105.04 107.816 105.744 105.896C106.448 103.912 107.088 102.056 107.664 100.328C108.24 98.536 108.752 96.808 109.2 95.144C109.712 93.416 110.16 91.592 110.544 89.672H110.064C107.632 89.672 105.648 89.096 104.112 87.944C102.64 86.792 101.904 85.288 101.904 83.432C101.904 82.92 101.968 82.312 102.096 81.608C102.288 80.904 102.512 80.296 102.768 79.784C103.984 79.976 105.168 80.104 106.32 80.168C107.536 80.232 109.104 80.264 111.024 80.264C115.056 80.264 118.832 80.168 122.352 79.976C125.872 79.72 129.04 79.464 131.856 79.208C134.736 78.952 137.2 78.728 139.248 78.536C141.296 78.28 142.864 78.152 143.952 78.152C145.424 78.152 146.736 78.92 147.888 80.456C149.04 81.992 149.936 84.168 150.576 86.984C148.528 86.792 146.864 86.664 145.584 86.6C144.368 86.536 143.28 86.504 142.32 86.504C139.056 86.504 136.048 86.664 133.296 86.984C130.608 87.24 128.048 87.56 125.616 87.944C125.232 88.52 124.784 89.256 124.272 90.152C123.824 91.048 123.216 92.328 122.448 93.992C121.68 95.592 120.688 97.704 119.472 100.328C118.32 102.952 116.848 106.28 115.056 110.312C117.552 109.928 119.92 109.608 122.16 109.352C124.464 109.096 126.384 108.968 127.92 108.968Z"
					fill="var(--active-color)"
				/>
			</g>
			<g filter="url(#filter2_d_4_3)">
				<path
					d="M114.976 64.104C114.976 67.176 114.272 70.088 112.864 72.84C111.52 75.528 109.632 77.96 107.2 80.136C104.768 82.248 101.92 84.04 98.656 85.512C95.392 86.984 91.84 87.976 88 88.488C88.96 91.368 90.112 94.344 91.456 97.416C92.864 100.424 94.368 103.336 95.968 106.152C97.568 108.968 99.232 111.56 100.96 113.928C102.688 116.296 104.384 118.248 106.048 119.784C105.728 120.424 105.248 121.064 104.608 121.704C104.032 122.344 103.328 122.92 102.496 123.432C101.728 124.008 100.896 124.456 100 124.776C99.168 125.16 98.368 125.352 97.6 125.352C96.192 125.352 94.848 124.68 93.568 123.336C92.288 121.992 90.976 119.88 89.632 117C88.352 114.056 86.976 110.28 85.504 105.672C84.096 101 82.528 95.4 80.8 88.872C80.096 88.872 79.392 88.872 78.688 88.872C77.984 88.872 77.44 88.808 77.056 88.68C76.608 88.424 76.128 87.976 75.616 87.336C73.888 91.048 72.352 94.536 71.008 97.8C69.664 101.064 68.448 104.232 67.36 107.304C66.336 110.312 65.408 113.256 64.576 116.136C63.808 118.952 63.136 121.832 62.56 124.776C60.384 124.264 58.496 123.336 56.896 121.992C55.296 120.648 53.792 118.76 52.384 116.328C52.64 115.752 52.896 115.208 53.152 114.696C53.472 114.12 53.856 113.352 54.304 112.392C54.752 111.368 55.296 110.088 55.936 108.552C56.64 107.016 57.536 104.968 58.624 102.408C59.776 99.848 61.12 96.712 62.656 93C64.256 89.288 66.176 84.776 68.416 79.464C69.44 77.096 70.304 75.016 71.008 73.224C71.776 71.432 72.448 69.736 73.024 68.136C73.6 66.472 74.112 64.84 74.56 63.24C75.072 61.576 75.584 59.688 76.096 57.576C73.152 58.6 70.4 59.752 67.84 61.032C65.344 62.248 63.264 63.56 61.6 64.968C61.024 64.584 60.416 64.008 59.776 63.24C59.2 62.472 58.656 61.64 58.144 60.744C57.632 59.784 57.184 58.824 56.8 57.864C56.416 56.904 56.192 56.04 56.128 55.272C58.048 53.992 60.384 52.808 63.136 51.72C65.952 50.632 68.928 49.704 72.064 48.936C75.2 48.104 78.4 47.464 81.664 47.016C84.928 46.568 87.968 46.344 90.784 46.344C98.464 46.344 104.416 47.944 108.64 51.144C112.864 54.28 114.976 58.6 114.976 64.104ZM91.552 56.04C91.104 56.616 90.4 57.768 89.44 59.496C88.48 61.224 87.36 63.304 86.08 65.736C84.864 68.104 83.552 70.696 82.144 73.512C80.8 76.328 79.488 79.112 78.208 81.864C83.008 81.864 87.424 81.416 91.456 80.52C95.488 79.624 98.976 78.376 101.92 76.776C104.864 75.112 107.136 73.192 108.736 71.016C110.4 68.776 111.232 66.312 111.232 63.624C111.232 60.424 110.08 57.992 107.776 56.328C105.472 54.6 101.92 53.736 97.12 53.736C96.032 53.736 94.944 53.8 93.856 53.928C92.768 53.992 91.616 54.088 90.4 54.216L91.552 56.04Z"
					fill="#222222"
				/>
			</g>
			<path
				d="M33.5659 115.664C33.1334 114.263 32.8634 112.201 32.7558 109.478C32.6383 106.724 32.6638 103.472 32.8323 99.7218C33.146 93.7296 33.6124 88.6844 34.2315 84.5863C34.8727 80.4465 35.7118 77.1178 36.7488 74.6C37.1507 74.5458 37.6617 74.5625 38.2818 74.6502C38.9338 74.7281 39.5796 74.8428 40.2194 74.9942C40.8493 75.1138 41.4204 75.2689 41.9328 75.4597C42.477 75.6406 42.8423 75.8069 43.0287 75.9587C41.4485 79.6557 40.2398 83.4822 39.4024 87.4384C38.5651 91.3945 38.0393 95.7952 37.8252 100.64C37.6472 104.812 37.6748 108.518 37.9078 111.761C38.131 114.971 38.5522 117.579 39.1714 119.586C39.3385 120.127 39.4417 120.462 39.481 120.589C39.5203 120.717 39.5756 120.839 39.6468 120.957C39.1812 121.031 38.7646 121.037 38.3969 120.976C38.0293 120.915 37.7632 120.788 37.5989 120.594C37.486 120.455 37.2371 120.27 36.8522 120.04C36.4771 119.842 36.1535 119.697 35.8814 119.607C35.5357 119.504 35.1445 119.084 34.7077 118.347C34.261 117.578 33.8804 116.684 33.5659 115.664Z"
				fill="#653E28"
				fill-opacity="0.4"
			/>
			<path
				d="M69.3708 153.107C69.415 153.427 69.3678 153.791 69.2291 154.201C69.1047 154.586 68.9201 154.864 68.6756 155.033C68.4437 155.095 68.1365 155.146 67.754 155.187C67.3662 155.208 66.9759 155.219 66.5829 155.221C66.1707 155.228 65.7874 155.227 65.4331 155.218C65.0595 155.215 64.7806 155.217 64.5963 155.225C64.5342 154.993 64.5145 154.688 64.5372 154.309C64.5548 153.911 64.6206 153.5 64.7347 153.076C64.8244 152.638 64.9604 152.219 65.1429 151.818C65.3008 151.403 65.4917 151.072 65.7156 150.826C66.1485 150.896 66.5751 151.02 66.9953 151.197C67.4156 151.374 67.7926 151.584 68.1266 151.826C68.4747 152.043 68.7526 152.269 68.9604 152.503C69.1874 152.732 69.3242 152.933 69.3708 153.107Z"
				fill="#653E28"
				fill-opacity="0.4"
			/>
			<path
				d="M64.7419 147.06C64.8156 147.592 64.7369 148.2 64.5059 148.883C64.2984 149.525 63.9908 149.987 63.5832 150.269C63.1968 150.372 62.6848 150.458 62.0472 150.525C61.401 150.56 60.7504 150.579 60.0955 150.582C59.4084 150.594 58.7696 150.593 58.1791 150.578C57.5564 150.573 57.0916 150.576 56.7845 150.59C56.681 150.203 56.6481 149.695 56.686 149.063C56.7152 148.4 56.825 147.715 57.0152 147.008C57.1646 146.278 57.3913 145.579 57.6954 144.91C57.9586 144.219 58.2768 143.667 58.6499 143.257C59.3715 143.374 60.0825 143.58 60.7828 143.876C61.4832 144.171 62.1117 144.521 62.6683 144.923C63.2485 145.286 63.7117 145.662 64.0579 146.052C64.4362 146.434 64.6643 146.77 64.7419 147.06Z"
				fill="#653E28"
				fill-opacity="0.4"
			/>
			<path
				d="M42.2743 128.929C42.5 128.799 42.8294 128.725 43.2624 128.708C43.6641 128.679 44.0212 128.722 44.3339 128.838C45.0998 130.898 45.9709 132.482 46.9472 133.59C47.9119 134.729 49.1133 135.564 50.5513 136.096C51.4892 136.443 52.3037 136.691 52.9949 136.841C53.7058 137.033 54.5394 137.181 55.4957 137.286C55.144 138.045 54.7199 138.758 54.2235 139.428C53.7467 140.14 53.2422 140.735 52.7098 141.213C52.1971 141.735 51.6623 142.123 51.1055 142.379C50.58 142.647 50.1123 142.758 49.7025 142.713C45.0567 139.324 42.5806 134.729 42.2743 128.929Z"
				fill="#653E28"
				fill-opacity="0.4"
			/>
			<path
				d="M106.022 165.487C105.732 165.563 105.373 165.639 104.945 165.717C104.477 165.77 103.871 165.825 103.128 165.882C102.352 165.947 101.423 166.018 100.341 166.094C99.2498 166.138 97.9365 166.189 96.401 166.246C96.0616 166.265 95.5077 166.255 94.7392 166.215C93.9707 166.175 93.1531 166.078 92.2863 165.926C91.3789 165.75 90.4869 165.501 89.6102 165.179C88.7251 164.824 88.0082 164.323 87.4596 163.674C87.4452 163.092 87.5941 162.278 87.9062 161.231C88.1861 160.194 88.7093 159.23 89.4759 158.34C90.5083 158.863 91.5112 159.272 92.4846 159.569C93.4496 159.834 94.4383 160.057 95.4509 160.241C96.4551 160.391 97.4873 160.518 98.5475 160.619C99.5993 160.689 100.712 160.794 101.886 160.935C102.882 161.054 103.901 161.132 104.945 161.169C105.956 161.215 106.82 161.161 107.538 161.008C108.119 160.856 108.526 160.767 108.76 160.74C109.018 160.672 109.168 160.719 109.21 160.88C109.244 161.009 109.231 161.289 109.171 161.718C109.111 162.147 108.974 162.613 108.762 163.117C108.508 163.597 108.165 164.065 107.734 164.522C107.302 164.98 106.732 165.301 106.022 165.487ZM82.6119 161.737C82.4184 161.788 82.1156 161.815 81.7033 161.82C81.5842 162.023 81.3803 162.232 81.0915 162.445C80.7943 162.626 80.5167 162.75 80.2587 162.818C79.9685 162.894 79.5731 162.963 79.0725 163.024C78.5312 163.063 77.9534 163.093 77.3392 163.116C76.725 163.139 76.0862 163.133 75.4229 163.1C74.7273 163.075 74.0963 163.034 73.5297 162.975C73.4285 162.588 73.4191 162.091 73.5015 161.484C73.5432 160.853 73.6655 160.2 73.8685 159.527C74.0392 158.862 74.2709 158.233 74.5636 157.64C74.8241 157.055 75.098 156.587 75.3853 156.236C75.8328 156.498 76.4549 156.835 77.2517 157.247C78.0162 157.667 78.8249 158.059 79.6777 158.422C80.4983 158.793 81.274 159.124 82.0048 159.415C82.7356 159.707 83.2468 159.883 83.5386 159.944C83.5752 160.348 83.5025 160.729 83.3204 161.087C83.1061 161.453 82.8699 161.67 82.6119 161.737Z"
				fill="#653E28"
				fill-opacity="0.4"
			/>
			<defs>
				<filter
					id="filter0_d_4_3"
					x="16"
					y="20"
					width="168"
					height="168"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_4_3"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_4_3"
						result="shape"
					/>
				</filter>
				<filter
					id="filter1_d_4_3"
					x="86.848"
					y="78.152"
					width="65.728"
					height="84.624"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="1" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_4_3"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_4_3"
						result="shape"
					/>
				</filter>
				<filter
					id="filter2_d_4_3"
					x="50.384"
					y="46.344"
					width="66.592"
					height="85.008"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="1" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_4_3"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_4_3"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_4_3"
					x1="99.5"
					y1="26"
					x2="99.5"
					y2="173"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="var(--active-color)" />
					<stop offset="0.65625" stop-color="var(--active-color)" stop-opacity="0.48" />
					<stop offset="1" stop-color="var(--active-color)" />
				</linearGradient>
				<radialGradient
					id="paint1_radial_4_3"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(100 100) rotate(90) scale(60)"
				>
					<stop offset="0.838542" stop-color="#EEEEEE" />
					<stop offset="1" stop-color="white" stop-opacity="0" />
				</radialGradient>
			</defs>
		</svg>
	)
}

