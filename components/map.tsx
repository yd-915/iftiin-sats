import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { PostType } from '../types/types'

const containerStyle = {
	width: '100%',
	height: '100%'
}

export default function SimpleMap({
	posts,
	handleMapClick,
	setOpenId,
	setShowPostModal,
	locationProps
}: {
	posts: PostType[]
	handleMapClick: (e: any) => void
	setOpenId: (id: string) => void
	setShowPostModal: (show: boolean) => void
	locationProps: { center: { lat: number; lng: number }; zoom: number }
}) {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyBzbCrAFKFxe5ytG-z2kCZf1MNiYzccjto'
	})

	return (
		// Important! Always set the container height explicitly
		<div className='mt-3'>
			{isLoaded && (
				<div style={{ height: '100vh', width: '100%' }}>
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={locationProps.center}
						onClick={handleMapClick}
						zoom={locationProps.zoom}>
						{posts &&
							posts?.map((post: PostType) => {
								return (
									<Marker
										key={post._id}
										position={{ lat: post.lat, lng: post.lng }}
										onClick={() => {
											setOpenId(post._id)
											setShowPostModal(true)
										}}
										icon={{
											url:
												post.type === 'sell'
													? 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
													: 'https://img.icons8.com/color/512/us-dollar-circled.png',
											scaledSize: new window.google.maps.Size(25, 25)
										}}
									/>
								)
							})}
					</GoogleMap>
				</div>
			)}
		</div>
	)
}
