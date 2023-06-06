package com.apmc.apmcSpringBoot.item;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.item.itemType.ItemType;
import com.apmc.apmcSpringBoot.item.validation.ItemValidatorImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;


public class ItemTest {
    @Mock
    private ItemRepository itemRepository;

    @InjectMocks
    private ItemServiceImpl itemService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllItems() {
        List<Item> items = new ArrayList<>();
        // Add some dummy items to the list
        items.add(new Item(1, "Item 1",new ItemType(1)));
        items.add(new Item(2, "Item 2",new ItemType(1) ));

        when(itemRepository.findAll()).thenReturn(items);

        List<Item> result = itemService.getAllItems();

        assertEquals(2, result.size());
        assertEquals("Item 1", result.get(0).getItemName());
        assertEquals("Item 2", result.get(1).getItemName());

        verify(itemRepository, times(1)).findAll();
    }

    @Test
    void testGetItemById() {
        Item item = new Item(1, "Item 1", new ItemType(2));
        when(itemRepository.findById(anyInt())).thenReturn(Optional.of(item));

        Item result = itemService.getItemById(1);

        assertNotNull(result);
        assertEquals("Item 1", result.getItemName());


        verify(itemRepository, times(1)).findById(anyInt());
    }

    @Test
    void testAddItem_ValidItem() {
        Item item = new Item(1, "Item 1", new ItemType(1));

        ItemValidatorImpl itemValidator = mock(ItemValidatorImpl.class);
        when(itemValidator.checkItem(item)).thenReturn(new ValidatorResponse(true, ""));

        when(itemRepository.existsByItemName(item.getItemName())).thenReturn(false);

        Response response = itemService.addItem(item);


        assertEquals("Ok", response.getMessage());
        assertTrue(response.isSuccess());

        verify(itemRepository, times(1)).existsByItemName(item.getItemName());
        verify(itemRepository, times(1)).save(item);
    }

    @Test
    void testAddItem_InvalidItem() {
        Item item = new Item(1, "", new ItemType(1));

        ItemValidatorImpl itemValidator = mock(ItemValidatorImpl.class);
        when(itemValidator.checkItem(item)).thenReturn(new ValidatorResponse(false, "Invalid item"));

        ValidatorException exception = assertThrows(ValidatorException.class,
                () -> itemService.addItem(item));

        assertEquals("Item Name required", exception.getMessage());

        verifyNoInteractions(itemRepository);
    }

    @Test
    void testAddItem_DuplicateItem() {
        Item item = new Item(1, "Item 1", new ItemType(1,"XYZ"));

        ItemValidatorImpl itemValidator = mock(ItemValidatorImpl.class);
        when(itemValidator.checkItem(item)).thenReturn(new ValidatorResponse(true, ""));

        when(itemRepository.existsByItemName(item.getItemName())).thenReturn(true);

        Response response = itemService.addItem(item);

        assertEquals("Item already exists", response.getMessage());
        assertEquals("Item already exists", response.getMessage());
        assertTrue(response.isSuccess());

        verify(itemRepository, times(1)).existsByItemName(item.getItemName());
        verifyNoMoreInteractions(itemRepository);
    }

    @Test
    void testDeleteItem_ItemExists() {
        Item item = new Item(1, "Item 1", new ItemType(1));

        when(itemRepository.findById(anyInt())).thenReturn(Optional.of(item));

        String result = itemService.deleteItem(1);

        assertEquals("deleted", result);

        verify(itemRepository, times(1)).findById(anyInt());
        verify(itemRepository, times(1)).deleteById(anyInt());
    }

    @Test
    void testDeleteItem_ItemDoesNotExist() {
        when(itemRepository.findById(anyInt())).thenReturn(Optional.empty());

        String result = itemService.deleteItem(1);

        assertEquals("Item doesn't exists", result);

        verify(itemRepository, times(1)).findById(anyInt());
        verifyNoMoreInteractions(itemRepository);
    }
}
