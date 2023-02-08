import { TestBed } from "@angular/core/testing";
import { StylesService } from "./styles.service"

describe ('Styleservice',()=>{
    let service: StylesService;

    beforeEach(() =>{
        TestBed.configureTestingModule({});
        service = TestBed.inject(StylesService);
    });

    it('should be created',()=>{
        expect(service).toBeTruthy();
    });
});