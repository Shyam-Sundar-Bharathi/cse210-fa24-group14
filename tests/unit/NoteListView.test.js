import { NoteListView } from '../../src/js/components/NoteListView';

describe('NoteListView', () => {
  let noteListView;
  let container;

  beforeEach(() => {
    // Setup a fresh DOM element before each test
    container = document.createElement('div');
    noteListView = new NoteListView(container);
  });

  test('should show empty state message when no notes exist', () => {
    noteListView.render([]);

    expect(container.innerHTML).toContain('No notes yet');
    expect(container.querySelector('.empty-state')).not.toBeNull();
  });

  test('should render list of notes', () => {
    const notes = [
      { content: 'Test note 1', timestamp: 1 },
      { content: 'Test note 2', timestamp: 2 },
    ];

    noteListView.render(notes);

    const noteElements = container.querySelectorAll('.note-item');
    expect(noteElements.length).toBe(2);
    expect(noteElements[0].querySelector('span').textContent).toBe(
      'Test note 1',
    );
    expect(noteElements[1].querySelector('span').textContent).toBe(
      'Test note 2',
    );
  });

  test('should call onDeleteNote callback when delete button is clicked', async () => {
    const mockDeleteCallback = jest.fn();
    noteListView.setOnDeleteNote(mockDeleteCallback);

    const notes = [{ content: 'Test note', timestamp: 123 }];
    noteListView.render(notes);

    const deleteButton = container.querySelector('button');
    await deleteButton.click();

    expect(mockDeleteCallback).toHaveBeenCalledWith(123);
  });
});
