import { ProjectItem } from '@/store/project-context';

export const boardsData = [
  { id: 'b1', name: 'PROJECTS' },
  { id: 'b2', name: 'PROCESSING' },
  { id: 'b3', name: 'CHECKING' },
  { id: 'b4', name: 'DONE' },
];

export const projectData: ProjectItem[] = [
  {
    id: 'p1',
    title: 'テスト1',
    detail: 'ああああ',
    client: 'I-ne',
    date: '2024/12/31',
    status: 'PROJECTS',
  },
  {
    id: 'p2',
    title: 'テスト2',
    detail: 'いいい',
    client: '今吉',
    date: '2024/12/31',
    status: 'PROJECTS',
  },
  {
    id: 'p3',
    title: 'テスト3',
    detail: 'うううう',
    client: 'honeymother',
    date: '2024/12/31',
    status: 'PROJECTS',
  },
  {
    id: 'p4',
    title: 'テスト4',
    detail: 'ええええ',
    client: 'honeymother',
    date: '2024/12/31',
    status: 'PROCESSING',
  },
  {
    id: 'p5',
    title: 'テスト5',
    detail: 'おおおお',
    client: 'honeymother',
    date: '2024/12/31',
    status: 'PROCESSING',
  },
  {
    id: 'p6',
    title: 'テスト6',
    detail: 'ああああ',
    client: 'honeymother',
    date: '2024/12/31',
    status: 'CHECKING',
  },
];

export const boards = [
  {
    id: 'b1',
    name: 'Projects',
    items: [
      {
        id: 'p1',
        title: 'テスト1',
        detail: 'ああああ',
        client: 'I-ne',
        date: '2024/12/31',
      },
      {
        id: 'p2',
        title: 'テスト2',
        detail: 'ああああ',
        client: '今吉',
        date: '2024/12/30',
      },
      {
        id: 'p3',
        title: 'テスト3',
        detail: 'ああああ',
        client: 'honeymother',
        date: '2024/12/29',
      },
    ],
  },
  {
    id: 'b2',
    name: 'Processing',
    item: [],
  },
  {
    id: 'b3',
    name: 'Checking',
    item: [],
  },
  {
    id: 'b4',
    name: 'Done',
    item: [],
  },
];
