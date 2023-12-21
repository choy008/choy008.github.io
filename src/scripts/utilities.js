import { marked } from 'marked';
import projectIndex from '../data/project-index.yml';

export async function getProjects()
{
	let projects = [];
	const dataFiles = import.meta.glob('/src/data/projects/*.yml');

	for (let i = 0; i < projectIndex.length; i++)
	{
		const projectName = projectIndex[i];
		const dataPath = `/src/data/projects/${projectName}.yml`;

		if (dataPath in dataFiles)
		{
			projects.push({
				'name': projectName,
				'data': await dataFiles[dataPath](),
			});
		}
		else
		{
			logError(`Data file not found for project "${projectName}"`);
		}
	}

	return projects;
}

export function constructPageTitle(pageInfo)
{
	let title = 'Jan Bláha';
	if ('title' in pageInfo) title = pageInfo['title'];
	if ('titlePrepend' in pageInfo) title = `${pageInfo['titlePrepend']} - ${title}`;
	if ('titleAppend' in pageInfo) title = `${title} - ${pageInfo['titleAppend']}`;

	return title;
}

export function logError(message)
{
	console.error(`\u001b[91m${message}\u001b[0m`);
}

export function extractFilename(path)
{
	return path.match(String.raw`[^\/]+(?=\.\w+$)`)[0];
}

export function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function renderMarkdown(content)
{
	content = content.replace("\n", "\n\n");
	return marked.parse(content);
}