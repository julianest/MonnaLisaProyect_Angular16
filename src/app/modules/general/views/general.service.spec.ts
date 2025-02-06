import { TestBed } from '@angular/core/testing';
import { GeneralService } from './general.service';
import { ApiService } from '../../../services/services.service';
import { of, throwError } from 'rxjs';
import { DepositRequest } from 'src/app/models/request/deposit-request.model';
import { RegisterAccountRequest } from 'src/app/models/request/registerAccount-request.model';

describe('GeneralService', () => {
  let service: GeneralService;
  let apiServiceMock: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiServiceMock = jasmine.createSpyObj('ApiService', ['post', 'get']);

    TestBed.configureTestingModule({
      providers: [
        GeneralService,
        { provide: ApiService, useValue: apiServiceMock }
      ]
    });

    service = TestBed.inject(GeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ✅ Test para depositTransaction (éxito)
  it('should call depositTransaction and return response', () => {
    const mockRequest: DepositRequest = { monto: 100, numeroCuenta: 123 };
    const mockResponse = { success: true };

    apiServiceMock.post.and.returnValue(of(mockResponse));

    service.depositTransaction(mockRequest).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiServiceMock.post).toHaveBeenCalledWith('transacciones/deposito', mockRequest);
  });

  // ✅ Test para depositTransaction (error)
  it('should handle error in depositTransaction', () => {
    const mockRequest: DepositRequest = { monto: 100, numeroCuenta: 123 };
    
    apiServiceMock.post.and.returnValue(throwError(() => new Error('Error de red')));

    service.depositTransaction(mockRequest).subscribe({
      error: (err) => expect(err).toBeTruthy(),
    });

    expect(apiServiceMock.post).toHaveBeenCalledWith('transacciones/deposito', mockRequest);
  });

  // ✅ Test para filtrerTransaction
  it('should call filtrerTransaction and return response', () => {
    const url = '123';
    const mockResponse = [{ id: 1, amount: 50 }];

    apiServiceMock.get.and.returnValue(of(mockResponse));

    service.filtrerTransaction(url).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiServiceMock.get).toHaveBeenCalledWith('movimiento/movimientos/' + url);
  });

  // ✅ Test para findBalance
  it('should call findBalance and return response', () => {
    const url = '123';
    const mockResponse = { balance: 500 };

    apiServiceMock.get.and.returnValue(of(mockResponse));

    service.findBalance(url).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiServiceMock.get).toHaveBeenCalledWith('cuenta-bancaria/mostrar-saldo-actual/' + url);
  });

  // ✅ Test para withdrawTransaction
  it('should call withdrawTransaction and return response', () => {
    const mockRequest: DepositRequest = { monto: 50, numeroCuenta: 123 };
    const mockResponse = { success: true };

    apiServiceMock.post.and.returnValue(of(mockResponse));

    service.withdrawTransaction(mockRequest).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiServiceMock.post).toHaveBeenCalledWith('transacciones/retiro', mockRequest);
  });

  // ✅ Test para registerAccount
  it('should call registerAccount and return response', () => {
    const mockRequest: RegisterAccountRequest = { saldo: 30,  numeroIdetificacion: '1234', tipoCuenta: 'Savings' };
    const mockResponse = { success: true };

    apiServiceMock.post.and.returnValue(of(mockResponse));

    service.registerAccount(mockRequest).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiServiceMock.post).toHaveBeenCalledWith('cuenta-bancaria/crear-cuenta', mockRequest);
  });

  // ✅ Test para getInfoUser
  it('should call getInfoUser and return response', () => {
    const url = '123';
    const mockResponse = { id: '123', name: 'John Doe' };

    apiServiceMock.get.and.returnValue(of(mockResponse));

    service.getInfoUser(url).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiServiceMock.get).toHaveBeenCalledWith('usuario/consultar/' + url);
  });
});