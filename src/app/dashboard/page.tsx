'use client'; // ✅ Ensures this is a Client Component (prevents hydration issues)

import { useState, useEffect } from 'react';
import DashboardCard from '../components/DashboardCard';
import Button from '../components/Button';
import WorkoutForm from '../components/WorkoutForm';

// ✅ Type definitions for Workout and Exercise objects
type Workout = {
	id: number;
	name: string;
	reps: number;
	sets: number;
	weight?: number;
	duration?: number;
};

type Exercise = {
	id: string;
	name: string; // ✅ Since the API only returns `id`, we will format it into `name`
};

function ExerciseSearch({ onSelectExercise }: { onSelectExercise: (exerciseName: string) => void }) {
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		async function fetchExercises() {
			try {
				setLoading(true);
				const response = await fetch('/api/exercises');

				if (!response.ok) {
					throw new Error(`HTTP Error! Status: ${response.status}`);
				}

				const data = await response.json();

				if (!Array.isArray(data)) {
					console.error('Unexpected API response:', data);
					throw new Error('Unexpected API response format');
				}

				const formattedExercises = data.map((exerciseId) => ({
					id: exerciseId,
					name: exerciseId.replace(/_/g, ' '),
				}));

				setExercises(formattedExercises);
				setFilteredExercises(formattedExercises);
			} catch (err) {
				console.error('Failed to fetch exercises:', err);
				setError('Failed to load exercises. Please try again.');
			} finally {
				setLoading(false);
			}
		}

		fetchExercises();
	}, []);

	useEffect(() => {
		if (!search) {
			setFilteredExercises(exercises);
		} else {
			setFilteredExercises(
				exercises.filter((exercise) =>
					exercise.name.toLowerCase().includes(search.toLowerCase())
				)
			);
		}
	}, [search, exercises]);

	if (loading) return <p>Loading exercises...</p>;
	if (error) return <p className='text-red-500'>{error}</p>;

	return (
		<div className='p-6'>
			<h2 className='text-xl font-bold'>Exercises</h2>

			<input
				type='text'
				placeholder='Search for an exercise...'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className='border p-2 w-full mb-4'
			/>

			<div className='overflow-y-auto max-h-[350px] border p-4 rounded-lg shadow-md'>
				{filteredExercises.length === 0 ? (
					<p className='text-gray-500'>No exercises found.</p>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
						{filteredExercises.map((exercise) => (
							<div
								key={exercise.id}
								className='p-3 bg-white shadow rounded-lg'
								onClick={() => onSelectExercise(exercise.name)}
							>
								<strong>{exercise.name}</strong>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default function Dashboard() {
	// ✅ State for workouts
	const [workouts, setWorkouts] = useState<Workout[]>([]);
	const [selectedExercise, setSelectedExercise] = useState('');
	const [loading, setLoading] = useState(true);

	// ✅ Fetch workouts from the API
	const fetchWorkouts = async () => {
		setLoading(true);
		try {
			const response = await fetch('/api/workouts');
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			setWorkouts(data.workouts ?? []);
		} catch (err) {
			console.error('Failed to fetch workouts: ', err);
			setWorkouts([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchWorkouts();
	}, []);

	const handleAddWorkout = async (workout: Workout) => {
		setWorkouts((prevWorkouts) => [...prevWorkouts, workout]);
		await fetchWorkouts();
	};

	const handleDeleteWorkout = async (id: number) => {
		try {
			const response = await fetch(`/api/workouts/${id}`, { method: 'DELETE' });
			if (!response.ok) {
				throw new Error('Failed to delete workout');
			}

			await fetchWorkouts();
		} catch (error) {
			console.error('Error deleting workout: ', error);
		}
	};

	return (
		<div className='p-6 space-y-6'>
			<h1 className='text-3xl font-bold text-gray-800'>Dashboard</h1>

			<div className='col-span-2'>
				<ExerciseSearch onSelectExercise={setSelectedExercise} />
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				<DashboardCard
					title='Total Workouts'
					value={workouts.length.toString()}
				/>
			</div>

			<WorkoutForm onAddWorkout={handleAddWorkout} />

			<div className='mt-6'>
				<h3 className='text-lg font-semibold'>Your Workouts</h3>
				{loading ? (
					<p>Loading workouts...</p>
				) : workouts.length === 0 ? (
					<p className='text-gray-500'>No workouts logged yet.</p>
				) : (
					<ul className='space-y-2'>
						{workouts.map((workout) => (
							<li
								key={workout.id}
								className='p-4 bg-white shadow rounded-lg flex justify-between items-center'
							>
								<div>
									<p className='font-semibold'>{workout.name}</p>
									<p className='text-gray-600'>
										{workout.reps} reps, {workout.sets} sets
									</p>

									{workout.weight && (
										<p className='text-gray-600'>
											Weight: {workout.weight} lbs
										</p>
									)}

									{workout.duration && (
										<p className='text-gray-600'>
											Rest Time: {workout.duration} sec
										</p>
									)}
								</div>
								<button
									onClick={() => handleDeleteWorkout(workout.id)}
									className='text-red-500 hover:text-red-700'
								>
									✕
								</button>
							</li>
						))}
					</ul>
				)}
			</div>

			<Button text='Logout' onClick={() => console.log('Logout placeholder')} />
		</div>
	);
}
