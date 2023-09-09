import FineService from '@fine/fine.service';
import LoansService from '@loans/loans.service';
import MaterialsService from '@materials/materials.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import NotificationsService from '@notifications/notifications.service';
import ReserveService from '@reserve/reserve.service';
import * as datesDiff from 'moment';

@Injectable()
export default class StartupService implements OnModuleInit {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly loansService: LoansService,
    private readonly materialService: MaterialsService,
    private readonly fineService: FineService,
    private readonly reserveService: ReserveService
  ) {}

  async onModuleInit() {
    await this.executeReserves();
    await this.createFines();
    await this.createNotifications();
  }

  private async executeReserves() {
    await this.reserveService.executeReserves();
  }

  private async createFines() {
    const fines = await this.checkFineService();
    await this.fineService.createBatch(fines);
  }

  private async checkFineService() {
    const overdueLoans = await this.loansService.getOverdueLoans();
    const currentDate = new Date();
    return overdueLoans.map(loan => ({
      debt: 75.0 + 0.2 * datesDiff(currentDate).diff(loan.returnDate, 'days'),
      paid: false,
      loanId: loan.loanId,
      clientId: loan.clientId
    }));
  }

  private async createNotifications() {
    await this.deletePreviousNotifications();
    const loanNotifications = await this.checkLoanService();
    const materialNotifications = await this.checkMaterialsService();
    const notifications = [...loanNotifications, ...materialNotifications];
    await this.notificationsService.createBatch(notifications);
  }

  private async deletePreviousNotifications() {
    await this.notificationsService.removeAll();
  }

  private async checkLoanService() {
    const overdueLoans = await this.loansService.getOverdueLoans();
    return overdueLoans.map(loan => ({
      notificationName: `Loan ${loan.loanId} is overdue`,
      notificationType: 'Loan',
      notificationContent: `Loan with ID ${loan.loanId} is overdue. Please take action.`,
      loanId: loan.loanId
    }));
  }

  private async checkMaterialsService() {
    const lowStockMaterials = await this.materialService.getLowStockMaterials();
    return lowStockMaterials.map(material => ({
      notificationName: `Material ${material.materialId} has low stock`,
      notificationType: 'Material',
      notificationContent: `Material with ID ${material.materialId} has low stock. Please reorder.`,
      materialId: material.materialId
    }));
  }
}
