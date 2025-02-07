'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import { FaBookmark } from 'react-icons/fa';

const BookmarkButton = ({ property }) => {
	const { data: session } = useSession();
	const userId = session?.user?.id;

	const [isBookmarked, setIsBookmarked] = useState(false);
	const [loading, setLoading] = useState(true);

	// Check the bookmarked status for the property on page load
	useEffect(() => {
		// Don't display anything if the user is not logged in
		if (!userId) {
			setLoading(false);
			return;
		}

		const checkBookmarkStatus = async () => {
			try {
				const res = await fetch('/api/bookmarks/check', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ propertyId: property._id }),
				});

				if (res.status === 200) {
					const data = await res.json();
					setIsBookmarked(data.isBookmarked);
				}
			} catch (error) {
				console.log(
					'### Something went wrong bookmarking this property:: error=',
					error
				);
			} finally {
				setLoading(false);
			}
		};
		checkBookmarkStatus();
	}, [property._id, userId]);

	const handleClick = async () => {
		if (!userId) {
			toast.error(
				'You need to sign in to be able to bookmark a property'
			);
			return;
		}

		try {
			const res = await fetch('/api/bookmarks', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ propertyId: property._id }),
			});

			if (res.status === 200) {
				const data = await res.json();
				toast.success(data.message);
				setIsBookmarked(data.isBookmarked);
			}
		} catch (error) {
			console.log(
				'### Something went wrong bookmarking this property:: error=',
				error
			);
			toast.error('Something went wrong');
		}
	};

	if (loading) {
		return <p className='text-center'>Checking bookmarks...</p>;
	}

	// For this to work properly & not just reset to the blue, Bookmark Property, state whenever a page is re-loaded
	// we need a route to check the bookmarked status... see useEffect above
	return isBookmarked ? (
		<button
			onClick={handleClick}
			className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
		>
			<FaBookmark className='mr-2' /> Remove Bookmark
		</button>
	) : (
		<button
			onClick={handleClick}
			className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
		>
			<FaBookmark className='mr-2' /> Bookmark Property
		</button>
	);
};
export default BookmarkButton;
