package ma.ensaf.todo.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import ma.ensaf.todo.entity.Todo;
import ma.ensaf.todo.repository.TodoRepository;

@ExtendWith(MockitoExtension.class)
class TodoServiceTest {
    @Mock
    private TodoRepository repository;

    @InjectMocks
    private TodoService service;

    private Todo todo;

    @BeforeEach
    void setUp() {
        todo = new Todo();
        todo.setId(1L);
        todo.setTitle("Prepare application");
    }

    @Test
    void findAllReturnsRepositoryTasks() {
        when(repository.findAll()).thenReturn(List.of(todo));
        assertEquals(List.of(todo), service.findAll());
        verify(repository).findAll();
    }

    @Test
    void createSavesAndReturnsTask() {
        when(repository.save(todo)).thenReturn(todo);
        assertSame(todo, service.create(todo));
        verify(repository).save(todo);
    }

    @Test
    void updateSetsPathIdBeforeSaving() {
        when(repository.save(todo)).thenReturn(todo);
        assertSame(todo, service.update(42L, todo));
        assertEquals(42L, todo.getId());
        verify(repository).save(todo);
    }

    @Test
    void findByIdReturnsExistingTask() {
        when(repository.findById(1L)).thenReturn(Optional.of(todo));
        assertSame(todo, service.findById(1L));
    }

    @Test
    void findByIdThrowsForMissingTask() {
        when(repository.findById(99L)).thenReturn(Optional.empty());
        RuntimeException error = assertThrows(RuntimeException.class, () -> service.findById(99L));
        assertEquals("Todo not found: 99", error.getMessage());
    }

    @Test
    void deleteDelegatesToRepository() {
        service.delete(1L);
        verify(repository).deleteById(1L);
    }
}
